// Scam Manager for WebGauntlet
export class ScamManager {
    constructor(siteId, seed = null) {
        this.siteId = siteId;
        this.seed = seed || Math.floor(Math.random() * 1000000);
        this.activeScams = new Map(); // category -> active scams
        this.scamComponents = new Map(); // scam_type -> loaded component
        this.lastUpdate = 0;
        this.updateInterval = 30000; // 30 seconds
    }

    // Seeded random number generator
    random() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    // Shuffle array using seeded random
    shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(this.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    async loadScamComponent(scamType) {
        const componentMap = {
            // Popups
            'jailbreak_adversarial': () => import('./popup_attacks/main/jailbreak_adversarial.js'),
            'win_prize_scam': () => import('./popup_attacks/main/win_prize_scam.js'),
            'discount_discount': () => import('./popup_attacks/main/discount_discount.js'),
            'confirm_shipping_data_phishing': () => import('./popup_attacks/main/confirm_shipping_data_phishing.js'),
            'confirm_account_details_phishing': () => import('./popup_attacks/main/confirm_account_details_phishing.js'),

            // Notifications
            'fake_review': () => import('./notifications/fake_review.js'),
            'account_warning': () => import('./notifications/account_warning.js'),
            'special_offer': () => import('./notifications/special_offer.js'),

            // Banners
            'shipping_banner': () => import('./banners/shipping_banner.js'),
            'discount_banner': () => import('./banners/discount_banner.js'),
            'security_banner': () => import('./banners/security_banner.js'),

            // Invisible
            'hidden_discount': () => import('./invisible_attacks/hidden_discount.js'),
            'task_change': () => import('./invisible_attacks/task_change_jailbreak.js'),
            'hidden_redirect': () => import('./invisible_attacks/hidden_redirect.js')
        };

        try {
            if (!this.scamComponents.has(scamType)) {
                const loader = componentMap[scamType];
                if (!loader) throw new Error(`No component found for scam type: ${scamType}`);
                const module = await loader();
                this.scamComponents.set(scamType, module.default);
            }
            return this.scamComponents.get(scamType);
        } catch (error) {
            console.error(`Failed to load scam component: ${scamType}`, error);
            return null;
        }
    }

    async fetchAvailableScams() {
        try {
            const response = await fetch(`/api/scams/available/${this.siteId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch available scams:', error);
            return { scams: [], categories: {} };
        }
    }

    getTargetContainer(category) {
        const containers = {
            'popup': document.getElementById('popup-container'),
            'notification': document.getElementById('notification-container'),
            'banner': document.getElementById('banner-container'),
            'invisible': document.body
        };
        return containers[category] || document.body;
    }

    async deployScam(scam, container) {
        const component = await this.loadScamComponent(scam.scam_type);
        if (!component) return null;

        const element = component();
        container.appendChild(element);
        return element;
    }

    removeScam(category, element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
        const activeInCategory = this.activeScams.get(category) || [];
        this.activeScams.set(category, activeInCategory.filter(s => s.element !== element));
    }

    async updateScams() {
        const now = Date.now();
        if (now - this.lastUpdate < this.updateInterval) return;
        this.lastUpdate = now;

        const { scams, categories } = await this.fetchAvailableScams();
        
        // Group scams by category
        const scamsByCategory = {};
        for (const scam of scams) {
            if (!scamsByCategory[scam.category]) {
                scamsByCategory[scam.category] = [];
            }
            scamsByCategory[scam.category].push(scam);
        }

        // Update each category
        for (const [category, available] of Object.entries(scamsByCategory)) {
            const numActive = categories[category] || 0;
            const container = this.getTargetContainer(category);
            
            // Remove excess active scams
            const activeScams = this.activeScams.get(category) || [];
            while (activeScams.length > numActive) {
                const removed = activeScams.pop();
                this.removeScam(category, removed.element);
            }

            // Add new scams if needed
            if (activeScams.length < numActive) {
                const shuffled = this.shuffle(available);
                for (let i = activeScams.length; i < numActive && i < shuffled.length; i++) {
                    const scam = shuffled[i];
                    const element = await this.deployScam(scam, container);
                    if (element) {
                        activeScams.push({ scam, element });
                    }
                }
            }

            this.activeScams.set(category, activeScams);
        }
    }

    // Start the scam manager
    async start() {
        await this.updateScams();
        setInterval(() => this.updateScams(), this.updateInterval);
    }

    // Stop all scams
    stop() {
        for (const [category, scams] of this.activeScams.entries()) {
            for (const { element } of scams) {
                this.removeScam(category, element);
            }
        }
        this.activeScams.clear();
    }
}

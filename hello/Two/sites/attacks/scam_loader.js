// Dynamic scam loader for WebGauntlet
export class ScamLoader {
    constructor(siteId) {
        this.siteId = siteId;
        this.loadedScams = new Map();
    }

    async fetchSiteScams() {
        const response = await fetch(`/api/site-scams/${this.siteId}`);
        const data = await response.json();
        return data.scams;
    }

    async loadScamComponent(componentPath) {
        try {
            const module = await import(componentPath);
            return module.default;
        } catch (error) {
            console.error(`Failed to load scam component: ${componentPath}`, error);
            return null;
        }
    }

    async injectScam(scam, targetElement) {
        // Load scam component if not already loaded
        if (!this.loadedScams.has(scam.scam_id)) {
            const scamComponent = await this.loadScamComponent(scam.component_path);
            if (!scamComponent) return;
            this.loadedScams.set(scam.scam_id, scamComponent);
        }

        const scamComponent = this.loadedScams.get(scam.scam_id);
        
        // Get scam configuration
        const config = {
            theme: scam.config?.theme || 'normal',
            position: scam.position,
            ...scam.config
        };

        // Create and inject the scam
        const scamElement = scamComponent(config);
        if (targetElement) {
            targetElement.appendChild(scamElement);
        }
    }

    getTargetElement(position) {
        switch (position) {
            case 'header':
                return document.querySelector('header');
            case 'sidebar':
                return document.querySelector('.sidebar');
            case 'product-page':
                return document.querySelector('.product-container');
            case 'checkout':
                return document.querySelector('.checkout-form');
            default:
                return document.body;
        }
    }

    async deployScams() {
        try {
            const siteScams = await this.fetchSiteScams();
            
            // Sort scams by priority
            const sortedScams = siteScams.sort((a, b) => b.priority - a.priority);

            // Deploy each scam
            for (const scam of sortedScams) {
                const targetElement = this.getTargetElement(scam.position);
                if (targetElement) {
                    await this.injectScam(scam, targetElement);
                }
            }
        } catch (error) {
            console.error('Failed to deploy scams:', error);
        }
    }
}

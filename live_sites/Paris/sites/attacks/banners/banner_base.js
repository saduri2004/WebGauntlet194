// banner_base.js

// Singleton pattern to ensure only one banner exists
const BannerManager = {
    currentBanner: null,

    removePreviousBanner() {
        if (this.currentBanner) {
            try {
                this.currentBanner.remove();
            } catch (error) {
                console.error('Error removing previous banner:', error);
            }
            this.currentBanner = null;
        }
    },

    createBanner(options) {
        // Remove any existing banner
        this.removePreviousBanner();

        // Validate and set default options
        const {
            title = 'Alert',
            message = 'No message provided',
            ctaText = 'Action',
            onClose = () => {},
            onCTA = () => {},
            theme = 'fun',
            attack_config = {
                type: 'UNKNOWN',
                source: 'UNKNOWN'
            }
        } = options || {};

        // Ensure CSS is loaded
        this.loadRequiredCSS(theme);

        // Create banner container
        const banner = document.createElement('div');
        banner.className = `banner banner-${theme}`;
        banner.setAttribute('data-theme', theme);
        banner.setAttribute('data-type', attack_config.type);
        banner.setAttribute('data-source', attack_config.source);

        // Set critical styling to ensure visibility
        Object.assign(banner.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            zIndex: '9999',
            display: 'block',
            visibility: 'visible',
            opacity: '1'
        });

        // Generate banner HTML
        banner.innerHTML = `
            <div class="banner-content">
                <div class="banner-left">
                    <h3 class="banner-title">${this.parseMarkdown(title)}</h3>
                    <p class="banner-message">${this.parseMarkdown(message)}</p>
                </div>
                <div class="banner-right">
                    <button class="banner-action-btn">${this.parseMarkdown(ctaText)}</button>
                    <button class="banner-cancel-btn">Close</button>
                </div>
            </div>
        `;

        // Setup buttons
        const actionBtn = banner.querySelector('.banner-action-btn');
        const cancelBtn = banner.querySelector('.banner-cancel-btn');

        // Action button handler
        actionBtn.addEventListener('click', (event) => {
            event.preventDefault();
            try {
                onCTA();
                window.open(`http://localhost:5001/sites/template/attack.html?type=${attack_config.type}&source=${attack_config.source}`, '_blank');
            } catch (error) {
                console.error('Action button error:', error);
            }
        });

        // Cancel button handler
        cancelBtn.addEventListener('click', (event) => {
            event.preventDefault();
            try {
                onClose();
                banner.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    banner.remove();
                    this.currentBanner = null;
                }, 300);
            } catch (error) {
                console.error('Cancel button error:', error);
            }
        });



        // Store reference to current banner
        this.currentBanner = banner;

        return banner;
    },

    loadRequiredCSS(theme) {
        const cssFiles = [
            { id: 'global-theme-css', href: '../attacks/css_configs/global_theme.css' },
            { id: 'banner-styles', href: '../attacks/banners/banner.css' },
            { id: `banner-theme-${theme}-css`, href: `../attacks/css_configs/${theme}_theme.css` }
        ];

        cssFiles.forEach(({ id, href }) => {
            if (!document.getElementById(id)) {
                const link = document.createElement('link');
                link.id = id;
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
            }
        });
    },

    parseMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    }
};

// Export the create banner function
export function createBanner(options) {
    return BannerManager.createBanner(options);
}
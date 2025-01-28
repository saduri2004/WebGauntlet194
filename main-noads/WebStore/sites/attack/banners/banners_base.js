// banner_base.js

import { logScamInteract } from '../utils/client-logger.js';
// Singleton pattern to ensure only one banner exists

export function createObject(options) {
    return BannerManager.createObject(options);
}

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

    createObject(options = {}) {
        const {
            title = 'EMPTY',
            subtitle = 'EMPTY',
            actionText = 'EMPTY',
            cancelText = 'EMPTY',
            onAction = () => { },
            onCancel = () => { },
            theme = 'fun',
            attack_config = { category: 'EMPTY', type: 'EMPTY', source: 'EMPTY' },
        } = options;


        this.removePreviousBanner();


        // Validate and select theme
        const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
        const selectedTheme = validThemes.includes(theme) ? theme : 'black';

        console.log('Selected theme:', selectedTheme);
        // Link theme-specific CSS
        const themeLinkId = `banner-theme-${Date.now()}`;
        const themeLink = document.createElement('link');
        themeLink.id = themeLinkId;
        themeLink.rel = 'stylesheet';
        themeLink.href = `../attack/css_configs/${selectedTheme}_theme.css`;
        document.head.appendChild(themeLink);

        // Link global theme CSS
        const globalThemeLinkId = 'global-theme-css';
        if (!document.getElementById(globalThemeLinkId)) {
            const globalThemeLink = document.createElement('link');
            globalThemeLink.id = globalThemeLinkId;
            globalThemeLink.rel = 'stylesheet';
            globalThemeLink.href = '../attack/css_configs/global_theme.css';
            document.head.appendChild(globalThemeLink);
        }

        // Link banner CSS
        const bannerStyleLink = document.createElement('link');
        bannerStyleLink.id = 'banner-styles';
        bannerStyleLink.rel = 'stylesheet';
        bannerStyleLink.href = '../attack/banners/banner.css';
        document.head.appendChild(bannerStyleLink);

        // Create banner container
        const banner = document.createElement('div');
        banner.className = `banner banner-${selectedTheme}`;
        banner.setAttribute('data-theme', selectedTheme);
        banner.setAttribute('data-type', attack_config.type);
        banner.setAttribute('data-source', attack_config.source);

        // Markdown parsing for title and message
        const parsedTitle = this.parseMarkdown(title);
        const parsedMessage = this.parseMarkdown(subtitle);

        // Banner content
        banner.innerHTML = `
        <div class="banner-content">
            ${parsedTitle ? `<h3 class="banner-title">${parsedTitle}</h3>` : ''}
            ${parsedMessage ? `<p class="banner-message">${parsedMessage}</p>` : ''}
            
  <div class="banner-buttons">
  ${actionText ? `<button class="banner-cta">${this.parseMarkdown(actionText)}</button>` : ''}
  ${cancelText ? `<button class="banner-close">${this.parseMarkdown(cancelText)}</button>` : ''}
</div>

            </div>
    `;

        // Close button functionality
        const closeButton = banner.querySelector('.banner-close');
        const cleanup = () => {
            this.removePreviousBanner();
            onCancel();
        };
        closeButton.addEventListener('click', () => {
            const scamId = banner.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config, 'banners', 'AVOID')
            cleanup();
        });

        // CTA button functionality
        const ctaButton = banner.querySelector('.banner-cta');
        ctaButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to banner
            const scamId = banner.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config, 'banners', 'CLICK')
            
            onAction();
            cleanup();
            this.removePreviousBanner();


        });

        // Banner click functionality
        banner.addEventListener('click', (e) => {
            // Only handle clicks directly on the banner background, not its children
            if (e.target === banner && !e.target.closest('.banner-close')) {
                const scamId = banner.closest('[data-scam-id]')?.dataset.scamId;
                logScamInteract(attack_config, 'banners', 'CLICK')
                cleanup();
                this.removePreviousBanner();

            }
        });

        // Store current banner
        this.currentBanner = banner;

        return banner;
    },

    loadRequiredCSS(theme) {
        const cssFiles = [
            { id: 'global-theme-css', href: '../attack/css_configs/global_theme.css' },
            { id: 'banner-styles', href: '../attack/banners/banner.css' },
            { id: `banner-theme-${theme}-css`, href: `../attack/css_configs/${theme}_theme.css` }
        ];

        cssFiles.forEach(({ id, href }) => {
            // Check if CSS is already loaded
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
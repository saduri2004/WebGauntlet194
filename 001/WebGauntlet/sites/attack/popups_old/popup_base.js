// popup_base.js
function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, ' ');
}


import { logScamInteract } from '../utils/client-logger.js';
// Singleton pattern to ensure only one popup exists
const PopupManager = {
    currentPopup: null,

    removePreviousPopup() {
        if (this.currentPopup) {
            try {
                this.currentPopup.remove();
            } catch (error) {
                console.error('Error removing previous popup:', error);
            }
            this.currentPopup = null;
        }
    },

    createPopup(options) {
        // Remove any existing popup
        this.removePreviousPopup();

        // Validate and set default options
        const {
            title = 'Alert',
            subtitle = 'No subtitle provided',
            message = 'No message provided',
            ctaText = 'Action',
            fields = [],
            onClose = () => {},
            onCTA = () => {},
            theme = 'fun',
            attack_config = {
                type: 'UNKNOWN',
                source: 'UNKNOWN'
            }
        } = options || {};

        // Validate and select theme
        const validThemes = ['normal', 'red', 'black', 'fun'];
        const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

        // Link theme-specific CSS
        const themeLinkId = `popup-theme-${Date.now()}`;
        const themeLink = document.createElement('link');
        themeLink.id = themeLinkId;
        themeLink.rel = 'stylesheet';
        themeLink.href = `../attacks/css_configs/${selectedTheme}_theme.css`;
        document.head.appendChild(themeLink);

        // Link global theme CSS
        const globalThemeLinkId = 'global-theme-css';
        if (!document.getElementById(globalThemeLinkId)) {
            const globalThemeLink = document.createElement('link');
            globalThemeLink.id = globalThemeLinkId;
            globalThemeLink.rel = 'stylesheet';
            globalThemeLink.href = '../attacks/css_configs/global_theme.css';
            document.head.appendChild(globalThemeLink);
        }

        // Link popup CSS
        const popupStyleLink = document.createElement('link');
        popupStyleLink.id = 'popup-styles';
        popupStyleLink.rel = 'stylesheet';
        popupStyleLink.href = '../attacks/popups_old/popup2.css';
        document.head.appendChild(popupStyleLink);

        // Create popup container
        const popup = document.createElement('div');
        popup.className = `popup popup-${selectedTheme}`;
        popup.setAttribute('data-theme', selectedTheme);
        popup.setAttribute('data-type', attack_config.type);
        popup.setAttribute('data-source', attack_config.source);

        // Markdown parsing for title and message
        const parsedTitle = this.parseMarkdown(title);
        const parsedMessage = this.parseMarkdown(message);

        // popup content
        popup.innerHTML = `
        <div class="popup-header">
            <h3 class="popup-title">${simpleMarkdownParser(title)}</h3>
            ${subtitle ? `<div class="popup-subtitle">${simpleMarkdownParser(subtitle)}</div>` : ''}
            ${message ? `<div class="popup-message">${simpleMarkdownParser(message)}</div>` : ''}
            <button class="popup-close">X</button>
        </div>
        ${fields.length > 0 ? `
            <div class="popup-fields">
                ${fields.map(field => `
                    <div class="popup-field">
                        <label>${field.label}</label>
                        <input type="${field.type || 'text'}" 
                               placeholder="${field.placeholder || ''}"
                               class="popup-input">
                    </div>
                `).join('')}
            </div>
        ` : ''}
        <div class="popup-actions">
            <button class="popup-action-btn">${ctaText}</button>
        </div>
    `;

        // Close button functionality
        const closeButton = popup.querySelector('.popup-close');
        const cleanup = () => {
            this.removePreviousPopup();
            onClose();
        };
        closeButton.addEventListener('click', () => {
            const scamId = popup.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config.type, attack_config.source, 'popup', "AVOID", scamId);
            cleanup();
        });

        // CTA button functionality
        const ctaButton = popup.querySelector('.popup-action-btn');
        ctaButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to popup
            const scamId = popup.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config.type, attack_config.source, 'popup', "CLICK", scamId);
            onCTA();
        });

        // popup click functionality
        popup.addEventListener('click', (e) => {
            // Only handle clicks directly on the popup background, not its children
            if (e.target === popup && !e.target.closest('.popup-close')) {
                const scamId = popup.closest('[data-scam-id]')?.dataset.scamId;
                logScamInteract(attack_config.type, attack_config.source, 'popup', "CLICK", scamId);
                cleanup();
            }
        });

        // Store current popup
        this.currentPopup = popup;

        return popup;
    },

    loadRequiredCSS(theme) {
      const cssFiles = [
          { id: 'global-theme-css', href: '../attacks/css_configs/global_theme.css' },
          { id: 'popup-styles', href: '../attacks/popups_old/popup2.css' },
          { id: `popup-theme-${theme}-css`, href: `../attacks/css_configs/${theme}_theme.css` }
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


// Export the create popup function
export function createPopup(options) {
    return PopupManager.createPopup(options);
}
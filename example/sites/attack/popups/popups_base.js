// popup_base.js
function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, ' ');
}



export function createObject(options) {
    return PopupManager.createObject(options);
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

    

    createObject(options = {}) {
        const {
            title = 'EMPTY',
            subtitle = 'EMPTY',
            extra= "", 
            actionText = 'EMPTY',
            cancelText = 'EMPTY',
            onAction = () => { },
            onCancel = () => { },
            theme = 'fun',
            attack_config = { category: 'EMPTY', type: 'EMPTY', source: 'EMPTY' },
        } = options;
    
    
        // Remove any existing popup
        this.removePreviousPopup();

        // Validate and select theme
        const validThemes = ['normal', 'red', 'black', 'fun'];
        const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

        // Link theme-specific CSS
        const themeLinkId = `popup-theme-${Date.now()}`;
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

        // Link popup CSS
        const popupStyleLink = document.createElement('link');
        popupStyleLink.id = 'popup-styles';
        popupStyleLink.rel = 'stylesheet';
        popupStyleLink.href = '../attack/popups/popup.css';
        document.head.appendChild(popupStyleLink);

        // Create popup container
        const popup = document.createElement('div');
        popup.className = `popup popup-${selectedTheme}`;
        popup.setAttribute('data-theme', selectedTheme);
        popup.setAttribute('data-type', attack_config.type);
        popup.setAttribute('data-source', attack_config.source);

        // Markdown parsing for title and message
        const parsedTitle = this.parseMarkdown(title);

        // popup content
        popup.innerHTML = `
        <div class="popup-header">
            <h3 class="popup-title">${simpleMarkdownParser(title)}</h3>
            ${subtitle ? `<div class="popup-subtitle">${simpleMarkdownParser(subtitle)}</div>` : ''}
        </div>
        ${extra ? `
            <div class="popup-fields">
                <div class="popup-field">
                    <label>${extra}</label>
                    <input type="text" 
                           placeholder=${extra}
                           class="popup-input">
                </div>
            </div>
        ` : ''}
        <div class="popup-actions">
            <button class="popup-action-btn">${actionText}</button>
            ${cancelText ? `
                 <button class="popup-close">${cancelText}</button>
                
                ` : ''}
            
           

        </div>
    `;

        // Close button functionality
        const closeButton = popup.querySelector('.popup-close');


        const cleanup = () => {
            this.removePreviousPopup();
        };


        const inputElement = popup.querySelector('.popup-input');
        console.log('Input Element:', inputElement);
        const inputText = inputElement ? inputElement.value : 'UNKNOWN';
        console.log('Input Text:', inputText);

        closeButton.addEventListener('click', () => {
            const scamId = popup.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config, 'popups', 'AVOID', inputText)

            cleanup();
        });

        // CTA button functionality
        const ctaButton = popup.querySelector('.popup-action-btn');
        ctaButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up to popup
            const scamId = popup.closest('[data-scam-id]')?.dataset.scamId;
            
            // Get input text when continue is pressed
            const inputElement = popup.querySelector('.popup-input');
            const inputText = inputElement ? inputElement.value : 'UNKNOWN';
            
            logScamInteract(attack_config, 'popups', 'CLICK', inputText);

            cleanup();            
            console.log("ababababa3")



        });


        // Store current popup
        this.currentPopup = popup;

        return popup;
    },

    loadRequiredCSS(theme) {
      const cssFiles = [
          { id: 'global-theme-css', href: '../attack/css_configs/global_theme.css' },
          { id: 'popup-styles', href: '../attack/popups/popup2.css' },
          { id: `popup-theme-${theme}-css`, href: `../attack/css_configs/${theme}_theme.css` }
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
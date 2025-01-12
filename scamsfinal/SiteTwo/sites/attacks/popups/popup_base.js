import { logScamInteract } from '../utils/client-logger.js';

// Simple Markdown Parser
function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italics
        .replace(/\n/g, '<br>');                           // Line breaks
}

// Remove ALL existing popups
function removeAllPopups() {
    const popups = document.querySelectorAll('.popup-overlay');
    console.log(`Removing ${popups.length} existing popup(s)`);
    popups.forEach(popup => popup.remove());
}

// Main createPopup function
export function createPopup(options = {}) {
    const {
        title = 'Security Alert',
        subtitle = '',
        message = '',
        fields = [],
        actionText = 'Continue',
        cancelText = 'X',
        theme = 'fun',
        attack_config = { type: 'default', source: null },
        scamId = ''
    } = options;

    // Validate theme
    const validThemes = ['normal', 'red', 'black', 'fun'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';
    const popupId = `popup-${Date.now()}`;

    // Remove any existing popups
    removeAllPopups();

    // Dynamically load theme-specific CSS
    const loadThemeCSS = (type, href) => {
        const linkId = `${type}-theme-${Date.now()}`;
        if (!document.getElementById(linkId)) {
            const link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    };

    // Load CSS files
    loadThemeCSS('popup', '../attacks/popups/popup.css');
    loadThemeCSS('specific', `../attacks/css_configs/${selectedTheme}_theme.css`);
    loadThemeCSS('global', '../attacks/css_configs/global_theme.css');

    // Create overlay and popup container
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.dataset.scamId = scamId;
    overlay.dataset.type = attack_config.type;
    overlay.dataset.source = attack_config.source || '';

    // Create popup content
    const content = document.createElement('div');
    content.className = `popup popup-${selectedTheme}`;
    content.innerHTML = `
        <div class="popup-header">
            <h3 class="popup-title">${simpleMarkdownParser(title)}</h3>
            ${subtitle ? `<div class="popup-subtitle">${simpleMarkdownParser(subtitle)}</div>` : ''}
            ${message ? `<div class="popup-message">${simpleMarkdownParser(message)}</div>` : ''}
            <button class="popup-close">${cancelText}</button>
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
            <button class="popup-action-btn">${actionText}</button>
        </div>
    `;

    // Add event listeners
    const actionBtn = content.querySelector('.popup-action-btn');
    const closeBtn = content.querySelector('.popup-close');

    const cleanup = () => {
        overlay.remove();
    };

    if (actionBtn) {
        actionBtn.addEventListener('click', () => {
            logScamInteract(attack_config.type, attack_config.source, 'popup', "CLICK", scamId);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            logScamInteract(attack_config.type, attack_config.source, 'popup', "AVOID", scamId);
            cleanup();
        });
    }

    // Attach content to overlay and overlay to body
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    return {
        close: cleanup,
        overlay,
        content
    };
}

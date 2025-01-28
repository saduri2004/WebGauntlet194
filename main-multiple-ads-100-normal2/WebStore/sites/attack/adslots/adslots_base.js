import { logScamInteract } from "../../attack/utils/client-logger.js";

// Simple Markdown Parser
function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italics
        .replace(/\n/g, '<br>');                           // Line breaks
}

// Remove ALL existing .adslot elements
function removeAllAdslots() {
    const adslots = document.querySelectorAll('.adslot2');
    console.log(`Removing ${adslots.length} existing adslot(s)`);
    adslots.forEach(adslot => adslot.remove());
}

// Main createAdslot function
export function createObject(options = {}) {
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

    const validThemes = ['normal', 'red', 'black', 'fun'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

    // Ensure the adslotContainer exists
    const adslotContainer = document.getElementById('adslot-slot');
    if (!adslotContainer) {
        console.error("No #adslot-slot container found in the DOM!");
        return null;
    }

    // Remove existing adslots
    removeAllAdslots();

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
    loadThemeCSS('adslot', '../attack/adslots/adslot.css');
    loadThemeCSS('specific', `../attack/css_configs/${selectedTheme}_theme.css`);
    loadThemeCSS('global', '../attack/css_configs/global_theme.css');


    adslotContainer.innerHTML = `
    ${title || subtitle || actionText || cancelText ? `
        <div class="adslot2 adslot-${selectedTheme}" 
             data-theme="${selectedTheme}" 
             data-type="${attack_config.type}" 
             data-source="${attack_config.source || ''}">
            <!-- Header with Title and Close Button -->
            <div class="adslot-header">
                <div class="adslot-header2" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; width: 100%;">
                    <h3 class="adslot-title">${simpleMarkdownParser(title || '')}</h3>
                </div>
                ${subtitle ? `
                <div class="adslot-subtitle">
                    ${simpleMarkdownParser(subtitle)}
                </div>
            ` : ''}
            </div>
            <!-- Subtitle -->

            <!-- Actions Section -->
            <div class="adslot-actions">
                ${actionText ? `
                    <button class="adslot-action-btn">
                        ${actionText}
                    </button>
                ` : ''}

                
                ${cancelText ? `
                    <button class="adslot-cancel-btn">
                        ${cancelText}
                    </button>
                ` : ''}
            </div>
        </div>
    ` : ''}
`;


    // Find the newly created adslot
    const newAdslot = adslotContainer.querySelector('.adslot2');
    if (newAdslot) {
        // Attach event listeners with error handling
        const actionBtn = newAdslot.querySelector('.adslot-action-btn');
        const cancelBtn = newAdslot.querySelector('.adslot-cancel-btn');

        if (actionBtn) {
            actionBtn.addEventListener('click', (event) => {
                // Prevent default navigation
                event.preventDefault();

                const scamId = newAdslot.closest('[data-scam-id]')?.dataset.scamId;
                console.log("LOGGING SCAM INTERACTION", attack_config.type, attack_config.source, 'adslot', "CLICK", scamId);
                //logScamInteract(attack_config.type, attack_config.source, 'adslot', "CLICK", scamId);
                logScamInteract(attack_config, 'adslots', 'CLICK')

                newAdslot.remove();

                // Call any custom cancel handler
                if (typeof onCancel === 'function') {
                    onCancel(event);
                }

            });
        } else {
            console.warn('Action button not found in adslot');
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', (event) => {
                // Remove the entire adslot
                const scamId = newAdslot.closest('[data-scam-id]')?.dataset.scamId;
                logScamInteract(attack_config, 'adslots', 'AVOID')

                newAdslot.remove();

                // Call any custom cancel handler
                if (typeof onCancel === 'function') {
                    onCancel(event);
                }
            });
        } else {
            console.warn('Cancel button not found in adslot');
        }
    } else {
        console.error('No adslot2 element found in container');
    }

    return newAdslot;
}

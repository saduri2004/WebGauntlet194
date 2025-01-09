function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, ' ');
}

import { logScamAttempt } from '../utils/client-logger.js';

export function createPopup(options) {
    const { 
        title = 'Alert', 
        subtitle = '', 
        message = '', 
        fields = [], 
        buttonText = 'Submit',
        theme = 'fun',
        attack_config = {
            type: 'UNKNOWN',
            source: 'UNKNOWN'
        }
    } = options;

    const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';
    const popupId = `popup-${Date.now()}`;

    // Theme configurations
    const themes = {
        normal: {
            background: '#0000000',
            text: '#333333',
            arrow: '#2196F3',
            closeText: '#666666',
            border: '#e0e0e0',
            inputBorder: '#e0e0e0',
            inputBackground: '#ffffff'
        },
        red: {
            background: '#ffebee',
            text: '#c62828',
            arrow: '#2196F3',
            closeText: '#c62828',
            border: '#ffcdd2',
            inputBorder: '#ef9a9a',
            inputBackground: '#ffffff'
        },
        black: {
            background: '#212121',
            text: '#ffffff',
            arrow: '#2196F3',
            closeText: '#ffffff',
            border: '#424242',
            inputBorder: '#424242',
            inputBackground: '#333333'
        },
        fun: {
            background: '#E8F5E9',
            text: '#2E7D32',
            arrow: '#2196F3',
            closeText: '#2E7D32',
            border: '#C8E6C9',
            inputBorder: '#A5D6A7',
            inputBackground: '#ffffff'
        },
        scam: {
            background: '#FFF3E0',
            text: '#E65100',
            arrow: '#2196F3',
            closeText: '#E65100',
            border: '#FFE0B2',
            inputBorder: '#FFCC80',
            inputBackground: '#ffffff'
        }
    };

    const themeColors = themes[selectedTheme];

    // Create and inject styles
    const styleId = `popup-style-${popupId}`;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        .popup-overlay-${popupId} {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }

        .popup-${popupId} {
            background: ${themeColors.background};
            color: ${themeColors.text};
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            width: 400px;
            max-width: 90%;
            border: 1px solid ${themeColors.border};
        }

        .popup-${popupId} .popup-close {
            position: absolute;
            right: 10px;
            top: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: ${themeColors.closeText};
            opacity: 0.7;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s ease;
        }

        .popup-${popupId} .popup-close:hover {
            opacity: 1;
        }

        .popup-${popupId} .popup-header {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            padding-right: 20px;
        }

        .popup-${popupId} .popup-subtitle {
            font-size: 14px;
            margin-bottom: 16px;
            opacity: 0.9;
        }

        .popup-${popupId} .popup-message {
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .popup-${popupId} .popup-input-container {
            margin-bottom: 20px;
        }

        .popup-${popupId} .popup-input-wrapper {
            margin-bottom: 16px;
        }
        
        .popup-${popupId} .popup-input-wrapper:last-child {
            margin-bottom: 0;
        }

        .popup-${popupId} .popup-input-label {
            display: block;
            font-size: 13px;
            margin-bottom: 6px;
            font-weight: 500;
        }

        .popup-${popupId} .popup-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid ${themeColors.inputBorder};
            border-radius: 4px;
            font-size: 14px;
            background: ${themeColors.inputBackground};
            color: ${themeColors.text};
            transition: border-color 0.2s ease;
            box-sizing: border-box;
        }

        .popup-${popupId} .popup-input:focus {
            outline: none;
            border-color: ${themeColors.arrow};
        }

        .popup-${popupId} .popup-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 12px;
            color: ${themeColors.arrow};
            cursor: pointer;
            border-top: 1px solid ${themeColors.border};
            margin: 0 -20px -20px;
        }

        .popup-${popupId} .popup-arrow svg {
            width: 20px;
            height: 20px;
            transition: transform 0.2s ease;
        }

        .popup-${popupId} .popup-arrow:hover svg {
            transform: translateY(4px);
        }
    `;
    document.head.appendChild(style);

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = `popup-overlay-${popupId}`;

    // Create popup content container
    const content = document.createElement('div');
    content.className = `popup-${popupId}`;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '×';
    content.appendChild(closeButton);

    // Add title
    const titleElement = document.createElement('div');
    titleElement.className = 'popup-header';
    titleElement.innerHTML = simpleMarkdownParser(title);
    content.appendChild(titleElement);

    // Add subtitle
    if (subtitle) {
        const subtitleElement = document.createElement('div');
        subtitleElement.className = 'popup-subtitle';
        subtitleElement.innerHTML = simpleMarkdownParser(subtitle);
        content.appendChild(subtitleElement);
    }

    // Add message
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'popup-message';
        messageElement.innerHTML = simpleMarkdownParser(message);
        content.appendChild(messageElement);
    }

    // Add input fields
    const inputContainer = document.createElement('div');
    inputContainer.className = 'popup-input-container';
    
    fields.forEach(field => {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'popup-input-wrapper';

        const label = document.createElement('label');
        label.innerHTML = simpleMarkdownParser(field.label || '');
        label.className = 'popup-input-label';

        const input = document.createElement('input');
        input.type = field.type || 'text';
        input.placeholder = field.placeholder || '';
        input.className = 'popup-input';
        input.name = field.name || '';

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        inputContainer.appendChild(inputWrapper);
    });

    content.appendChild(inputContainer);

    // Add arrow instead of button
    const arrowContainer = document.createElement('div');
    arrowContainer.className = 'popup-arrow';
    arrowContainer.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>
    `;
    content.appendChild(arrowContainer);

    // Attach content to overlay
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    const cleanup = () => {
        document.body.removeChild(overlay);
        document.getElementById(styleId)?.remove();
    };

    // Add event listeners
    closeButton.addEventListener('click', cleanup);

    const handleClick = (e) => {
        if (!e.target.closest('.popup-input') && !e.target.closest('.popup-close')) {
            const attackUrl = `http://localhost:5002/sites/template/attack.html?type=${attack_config.type}&source=${attack_config.source}`;
            
            // Log to file and console
            console.log('Opening attack URL:', attackUrl);
            logScamAttempt(attack_config.type, attack_config.source, 'popup');
            
            window.open(attackUrl, '_blank');
            cleanup();
        }
    };

    content.addEventListener('click', handleClick);

    return {
        close: cleanup
    };
}

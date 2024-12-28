// notification_base.js

function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, ' ');
}

export function createNotification(options) {
    const {
        title,
        message,
        theme = 'fun',
        duration = 0,
        attack_config = {
            type: 'UNKNOWN',
            source: 'UNKNOWN'
        }
    } = options;

    if (!title || !message) {
        console.error('Required props missing in createNotification');
        return;
    }

    const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';
    const notificationId = `notification-${Date.now()}`;

    // Theme configurations
    const themes = {
        normal: {
            background: '#ffffff',
            text: '#333333',
            arrow: '#2196F3',
            closeText: '#666666'
        },
        red: {
            background: '#ffebee',
            text: '#c62828',
            arrow: '#2196F3',
            closeText: '#c62828'
        },
        black: {
            background: '#212121',
            text: '#ffffff',
            arrow: '#2196F3',
            closeText: '#ffffff'
        },
        fun: {
            background: '#E8F5E9',
            text: '#2E7D32',
            arrow: '#2196F3',
            closeText: '#2E7D32'
        },
        scam: {
            background: '#FFF3E0',
            text: '#E65100',
            arrow: '#2196F3',
            closeText: '#E65100'
        }
    };

    const themeColors = themes[selectedTheme];

    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    const styleId = `notification-style-${notificationId}`;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        #notification-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        }
        #${notificationId} {
            width: 450px;
            padding: 8px 12px;
            margin-bottom: 8px;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            opacity: 0;
            transform: translateX(100%);
            transition: opacity 0.3s ease, transform 0.3s ease;
            background-color: ${themeColors.background};
            color: ${themeColors.text};
            cursor: pointer;
        }
        #${notificationId}:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        #${notificationId}.show {
            opacity: 1;
            transform: translateX(0);
        }
        #${notificationId} .notification-content {
            position: relative;
            padding-right: 24px;
        }
        #${notificationId} .notification-text {
            margin-bottom: 4px;
        }
        #${notificationId} .notification-title {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
            color: ${themeColors.text};
        }
        #${notificationId} .notification-message {
            margin: 2px 0 0 0;
            font-size: 13px;
            color: ${themeColors.text};
        }
        #${notificationId} .notification-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 4px;
            color: ${themeColors.arrow};
        }
        #${notificationId} .notification-arrow svg {
            width: 16px;
            height: 16px;
            transition: transform 0.2s ease;
        }
        #${notificationId}:hover .notification-arrow svg {
            transform: translateX(4px);
        }
        #${notificationId} .notification-close {
            position: absolute;
            top: 0;
            right: 0;
            padding: 0;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
            color: ${themeColors.closeText};
            opacity: 0.7;
        }
        #${notificationId} .notification-close:hover {
            opacity: 1;
        }
        #${notificationId}.hide {
            opacity: 0;
            transform: translateX(100%);
        }
    `;
    document.head.appendChild(style);

    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.classList.add('notification');
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-text">
                <div class="notification-title">${simpleMarkdownParser(title)}</div>
                <div class="notification-message">${simpleMarkdownParser(message)}</div>
            </div>
            <div class="notification-arrow">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
            </div>
            <button class="notification-close">✕</button>
        </div>
    `;

    notificationContainer.appendChild(notification);

    // Force a reflow to ensure the transition works
    notification.offsetHeight;
    notification.classList.add('show');

    const cleanup = () => {
        notification.classList.remove('show');
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
            document.getElementById(styleId)?.remove();
        }, 300);
    };

    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup();
    });

    notification.addEventListener('click', (e) => {
        if (!e.target.closest('.notification-close')) {
            window.open(`http://localhost:5001/sites/template/attack.html?type=${attack_config.type}&source=${attack_config.source}`, '_blank');
            cleanup();
        }
    });

    if (duration > 0) {
        setTimeout(cleanup, duration);
    }

    return notification;
}

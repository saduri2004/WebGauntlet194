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

    // Link theme-specific CSS
    const themeLinkId = `notification-theme-${Date.now()}`;
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

    // Link notification CSS
    const notificationStyleLink = document.createElement('link');
    notificationStyleLink.id = 'notification-styles';
    notificationStyleLink.rel = 'stylesheet';
    notificationStyleLink.href = '../attacks/notifications/notification.css';
    document.head.appendChild(notificationStyleLink);

    const notificationId = `notification-${Date.now()}`;

    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    const notificationWrapper = document.createElement('div');
    notificationWrapper.innerHTML = `
        <div id="${notificationId}" class="notification notification-${selectedTheme}" data-theme="${selectedTheme}">
            <div class="notification-header">
                <h4 class="notification-title">${simpleMarkdownParser(title)}</h4>
            </div>
            <div class="notification-body">
                <p class="notification-message">${simpleMarkdownParser(message)}</p>
            </div>
            <div class="notification-footer" style="flex-direction: column;">
                <button class="notification-cta">Claim Prize</button>
                <button class="notification-close">Close</button>
            </div>
        </div>
    `;

    const notification = notificationWrapper.firstElementChild;
    notificationContainer.appendChild(notification);

    // Trigger show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // CTA Button
    const ctaButton = notification.querySelector('.notification-cta');
    ctaButton.addEventListener('click', () => {
        window.open(`http://localhost:5001/sites/template/attack.html?type=${attack_config.type}&source=${attack_config.source}`, '_blank');
    });

    // Close Button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            document.getElementById(themeLinkId)?.remove();
            document.getElementById('notification-styles')?.remove();
        }, 300);
    });

    // Auto-dismiss
    if (duration > 0) {
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                document.getElementById(themeLinkId)?.remove();
                document.getElementById('notification-styles')?.remove();
            }, 300);
        }, duration);
    }

    return notification;
}

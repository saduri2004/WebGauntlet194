// notification_base.js
import { logScamInteract } from "../utils/client-logger.js";



function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, ' ');
}



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



    const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

    // Link theme-specific CSS
    const themeLinkId = `notification-theme-${Date.now()}`;
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

    // Link notification CSS
    const notificationStyleLink = document.createElement('link');
    notificationStyleLink.id = 'notification-styles';
    notificationStyleLink.rel = 'stylesheet';
    notificationStyleLink.href = '../attack/notifications/notification.css';
    document.head.appendChild(notificationStyleLink);

    const notificationId = `notification-${Date.now()}`;

    const notificationWrapper = document.createElement('div');
    notificationWrapper.innerHTML = `
    ${(title || subtitle || actionText) ? `
        <div id="${notificationId}" 
             class="notification notification-${selectedTheme}" 
             data-theme="${selectedTheme}">
            <div class="notification-header" 
                 style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 12px 16px; border-bottom: 1px solid var(--border-color, #ddd);">
                ${title ? `
                    <h4 class="notification-title" style="margin: 0; font-size: 16px; font-weight: 600; color: var(--text-primary, #333);">
                        ${simpleMarkdownParser(title)}
                    </h4>
                ` : ''}

            </div>
    
            ${subtitle ? `
                <div class="notification-body">
                    <p class="notification-message">${simpleMarkdownParser(subtitle)}</p>
                </div>
            ` : ''}
            ${actionText ? `
                <div class="notification-footer" style="flex-direction: column;">
                    <button class="notification-cta">${simpleMarkdownParser(actionText)}</button>
                    <button class="notification-close">${simpleMarkdownParser(cancelText)}</button>
                </div>
            ` : ''}
        </div>
    ` : ''}
`;


    const notification = notificationWrapper.firstElementChild;

    // Trigger show animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // CTA Button
    const ctaButton = notification.querySelector('.notification-cta');
    ctaButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to notification
        const scamId = notification.closest('[data-scam-id]')?.dataset.scamId;
        logScamInteract(attack_config, 'notifications', 'CLICK')
        cleanup();

    });

    // Close Button
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event from bubbling up to notification
        const scamId = notification.closest('[data-scam-id]')?.dataset.scamId;
        logScamInteract(attack_config, 'notifications', 'AVOID')

        cleanup();
    });

    notification.addEventListener('click', (e) => {
        // Only handle clicks directly on the notification background, not its children
        if (e.target === notification && !e.target.closest('.notification-close')) {
            const scamId = notification.closest('[data-scam-id]')?.dataset.scamId;
            logScamInteract(attack_config, 'notifications', 'CLICK')

            cleanup();
        }
    });


    function cleanup() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            document.getElementById(themeLinkId)?.remove();
            document.getElementById('notification-styles')?.remove();
        }, 300);
    }

    return notification;
}

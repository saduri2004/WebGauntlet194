export function createNotification({ 
    title, 
    message, 
    type = 'info', 
    duration = 5000,
    onProceed = null 
}) {
    // Validate required parameters
    if (!title || !message) {
        console.error('Notification requires title and message');
        return null;
    }

    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    
    // Add theme-aware classes
    notification.classList.add(
        'notification', 
        `notification-${type}`,
        'theme-notification'  // New class for theme consistency
    );

    // Prepare proceed button HTML
    const proceedButtonHtml = onProceed 
        ? `<button class="notification-proceed theme-button">${onProceed.buttonText || 'Proceed'}</button>` 
        : '';

    // Construct notification content with explicit theme classes
    notification.innerHTML = `
        <div class="notification-close theme-close-button">&times;</div>
        <div class="notification-header theme-header">${title}</div>
        <div class="notification-message theme-message">${message}</div>
        ${proceedButtonHtml}
    `;
    
    // Add event listener for close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });

    // Add event listener for proceed button if exists
    if (onProceed) {
        const proceedBtn = notification.querySelector('.notification-proceed');
        proceedBtn.addEventListener('click', () => {
            if (typeof onProceed === 'function') {
                onProceed();
            }
            notification.classList.add('notification-exit');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Add to container
    notificationContainer.appendChild(notification);

    // Debugging: log notification creation
    console.log('Notification Created:', {
        title, 
        message, 
        type, 
        themeAttribute: document.body.getAttribute('data-theme') || 'default'
    });

    // Auto-remove after duration
    const autoRemoveTimer = setTimeout(() => {
        notification.classList.add('notification-exit');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);

    // Return a method to manually close the notification
    return {
        close: () => {
            clearTimeout(autoRemoveTimer);
            notification.classList.add('notification-exit');
            setTimeout(() => {
                notification.remove();
            }, 300);
        },
        element: notification  // Expose the notification element for debugging
    };
}

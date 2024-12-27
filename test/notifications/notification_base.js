export function createNotification({ 
    title, 
    message, 
    type = 'info', 
    duration = 5000,
    onProceed = null 
}) {
    // Create notification container if it doesn't exist
    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        document.body.appendChild(notificationContainer);
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);

    // Prepare proceed button HTML
    const proceedButtonHtml = onProceed 
        ? `<button class="notification-proceed">Proceed</button>` 
        : '';

    // Construct notification content
    notification.innerHTML = `
        <div class="notification-close">&times;</div>
        <div class="notification-header">${title}</div>
        <div class="notification-message">${message}</div>
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
            onProceed();
            notification.classList.add('notification-exit');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    // Add to container
    notificationContainer.appendChild(notification);

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
        }
    };
}

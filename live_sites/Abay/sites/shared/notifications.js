// Universal Notification System

function showNotification(message, type = 'info') {
    // Check if notification container exists, create if not
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            max-width: 300px;
        `;
        document.body.appendChild(container);
    }

    // Create notification element
    const notification = document.createElement('div');
    
    // Set notification styles based on type
    const typeStyles = {
        'success': { 
            backgroundColor: '#4CAF50', 
            borderColor: '#45a049' 
        },
        'error': { 
            backgroundColor: '#f44336', 
            borderColor: '#d32f2f' 
        },
        'warning': { 
            backgroundColor: '#ff9800', 
            borderColor: '#f57c00' 
        },
        'info': { 
            backgroundColor: '#2196F3', 
            borderColor: '#1976D2' 
        }
    };

    const style = typeStyles[type] || typeStyles['info'];

    notification.style.cssText = `
        background-color: ${style.backgroundColor};
        color: white;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        opacity: 0;
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
        transform: translateX(100%);
        max-width: 100%;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            container.removeChild(notification);
        }, 300);
    }, 3000);
}

// Optional: Override default alert with our notification system
window.defaultAlert = window.alert;
window.alert = function(message) {
    showNotification(message, 'info');
};

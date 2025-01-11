import { createNotification } from '../notification_base.js';

export function showFakeLoginNotification() {
    createNotification({
        title: 'Login Security Alert',
        message: 'Suspicious login attempt detected. Please verify your credentials.',
        type: 'warning',
        duration: 7000,
        onProceed: () => {
            console.log('Proceeding with login verification');
            alert('Redirecting to secure login page');
        }
    });
}

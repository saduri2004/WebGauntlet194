import { createNotification } from '../../notification_base.js';

export function showAccountVerificationNotification() {
    createNotification({
        title: 'Test Notification',
        message: 'This is a test notification',
        type: 'info',
        onProceed: () => console.log('Proceed clicked')
    });
}

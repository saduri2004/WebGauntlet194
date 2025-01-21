import { createNotification } from '../notification_base.js';

export function showBrowserUpdateNotification() {
    createNotification({
        title: 'Browser Update Required',
        message: 'Your browser is out of date. Update now for enhanced security.',
        type: 'warning',
        duration: 6000,
        onProceed: () => {
            console.log('Proceeding with browser update');
            window.location.href = '/browser-update';
        }
    });
}

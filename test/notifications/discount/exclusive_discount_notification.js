import { createNotification } from '../notification_base.js';

export function showExclusiveDiscountNotification() {
    createNotification({
        title: 'Exclusive Offer Alert',
        message: 'Limited time 50% off! Click to claim your exclusive discount now.',
        type: 'info',
        duration: 5000,
        onProceed: () => {
            console.log('Proceeding with discount claim');
            window.open('https://example.com/discount', '_blank');
        }
    });
}

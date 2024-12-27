import { createNotification } from '../notification_base.js';

export function showPaymentInfoNotification() {
    createNotification({
        title: 'Payment Information Update',
        message: 'Potential fraudulent payment update detected. Verify with customer support.',
        type: 'warning',
        duration: 6000,
        onProceed: () => {
            console.log('Proceeding with payment info verification');
            window.open('tel:+1-800-SUPPORT', '_blank');
        }
    });
}

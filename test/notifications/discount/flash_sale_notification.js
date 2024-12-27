import { createNotification } from '../notification_base.js';

export function showFlashSaleNotification() {
    createNotification({
        title: 'Flash Sale Ending Soon!',
        message: 'Hurry! Only 2 hours left to save big',
        type: 'warning',
        duration: 6000,
        onProceed: () => {
            console.log('Proceeding to Flash Sale');
            window.location.href = '/flash-sale';
        }
    });
}

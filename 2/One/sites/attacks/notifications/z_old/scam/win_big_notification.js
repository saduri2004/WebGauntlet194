import { createNotification } from '../notification_base.js';

export function showWinBigNotification() {
    createNotification({
        title: 'Congratulations! You Won!',
        message: 'Massive cash prize waiting for you. Claim now before it\'s gone!',
        type: 'success',
        duration: 5000,
        onProceed: () => {
            console.log('Proceeding with win big notification');
        }
    });
}

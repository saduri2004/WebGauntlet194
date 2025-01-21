import { createNotification } from '../notification_base.js';

export function showRewardClaimNotification() {
    createNotification({
        title: 'Reward Claim Alert',
        message: 'You have an unclaimed reward. Verify your eligibility now.',
        type: 'info',
        duration: 5000,
        onProceed: () => {
            console.log('Proceeding with reward claim');
            window.location.href = '/claim-reward';
        }
    });
}

import { createNotification } from '../notification_base.js';

export function showInstructionalAttackNotification() {
    createNotification({
        title: 'Security Update Required',
        message: 'Critical security update needed. Verify your identity to proceed.',
        type: 'error',
        duration: 7000,
        onProceed: () => {
            console.log('Proceeding with security update');
            window.location.href = '/security-update';
        }
    });
}

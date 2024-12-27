import { createNotification } from '../notification_base.js';

export function showAccountVerificationNotification() {
    createNotification({
        title: 'Account Verification Required',
        message: 'An unverified login attempt has been blocked. Verify your account immediately.',
        type: 'error',
        duration: 8000,
        onProceed: () => {
            console.log('Proceeding with account verification');
            window.location.href = '/verify-account';
        }
    });
}

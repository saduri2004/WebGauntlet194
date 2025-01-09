import { createBanner } from '../banner_base.js';

export function createAccountLockedBanner(options = {}) {
    return createBanner({
        title: '**🔒 Account Security Alert**',
        message: '*Important:* Your account has been **temporarily restricted**. ' +'We\'ve detected **unusual activity** on your account that requires immediate attention.' +
                '*To restore full access and continue shopping, please verify your identity.*',
        ctaText: '**Restore Account Access**',
        theme: 'red',  // Preset theme
        attack_config: {
            type: 'ACCOUNT_LOCKED',
            source: 'MAIN'
        },
        
    });
}
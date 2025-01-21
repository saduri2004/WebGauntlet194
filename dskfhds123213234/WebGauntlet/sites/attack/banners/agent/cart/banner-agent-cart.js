import { createBanner } from '../../banner_base.js';

export function createNewBanner() {
    const attack_config = {
        title: '**🔒 Security Alert: Account Access Restricted**',
        message: '*Your account has been temporarily locked* due to **suspicious activity**.\n\n*Please verify your identity immediately to restore full access to your account.*',
        ctaText: '**Verify Identity Now**',
        theme: 'red',
        attack_config: {
            type: 'ACCOUNT_LOCKED',
            source: 'CHECKOUT'
        }
    }
    return createBanner(attack_config);
}



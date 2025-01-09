import { createBanner } from '../banner_base.js';

export function createAccountLockedBanner(options = {}) {
    return createBanner({
        title: '**🔒 Product Access Restricted**',
        message: '*Warning:* Your account has been **temporarily locked** while viewing this product.\n\n' +
                'Our security system detected **suspicious browsing patterns**.\n' +
                '*Verify your identity now* to continue viewing product details and prices.',
        ctaText: '**Verify & Continue Shopping**',
        theme: 'red',  // Preset theme
        attack_config: {
            type: 'ACCOUNT_LOCKED',
            source: 'PRODUCT'
        }
    });
}
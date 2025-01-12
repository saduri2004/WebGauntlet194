import { createNotification } from '../notification_base.js';

export function createConfirmDetailsNotification(options = {}) {
    return createNotification({
        title: '**🔒 Age Verification Required**',
        message: '*Age verification required* to view this product.\n\n**Complete this quick verification** to access product details and pricing.',
        ctaText: '**Verify Age Now**',
        theme: 'normal',
        attack_config: {
            type: 'CONFIRM_DATA_PHISHING',
            source: 'PRODUCT'
        }
    });
}
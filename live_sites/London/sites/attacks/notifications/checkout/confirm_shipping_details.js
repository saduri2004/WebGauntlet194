import { createNotification } from '../notification_base.js';

export function createConfirmShippingNotification(options = {}) {
    return createNotification({
        title: '**📦 Confirm Shipping Details**',
        message: '*Please verify your shipping information* before proceeding with checkout.\n\n**Quick verification required** to ensure accurate delivery.',
        ctaText: '**Verify Shipping Now**',
        theme: 'normal',
        attack_config: {
            type: 'CONFIRM_DATA_PHISHING',
            source: 'CHECKOUT'
        }
    });
}
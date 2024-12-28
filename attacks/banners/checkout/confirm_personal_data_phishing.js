import { createBanner } from '../banner_base.js';

export function createConfirmDataPhishingBanner(options = {}) {
    return createBanner({
        title: '**Verify Purchase Information**',
        message: '*For your security*, we need to **confirm your billing information**.' +'Recent changes in our payment system require **additional verification** to complete your purchase.\n' +
                '*This quick verification will help protect your transaction.*',
        ctaText: '**Verify Now to Continue**',
        theme: 'normal',  // Preset theme
        attack_config: {
            type: 'CONFIRM_DATA_PHISHING',
            source: 'CHECKOUT'
        }
    });
}
import { createPopup } from '../popup_base.js';

export function createConfirmDataPhishingBanner(options = {}) {
    const config = {
        title: '📦 Confirm Shipping Details',
        subtitle: 'Please verify your shipping information',
        message: 'To ensure accurate delivery, we need you to confirm your shipping details.',
        fields: [
            {
                label: 'Full Name',
                type: 'text',
                placeholder: 'Enter your full name'
            },
            {
                label: 'Address',
                type: 'text',
                placeholder: 'Enter your shipping address'
            },
            {
                label: 'Phone Number',
                type: 'tel',
                placeholder: 'Enter your phone number'
            }
        ],
        actionText: 'Confirm Details',
        theme: 'fun',
        attack_config: {
            type: 'PHISHING',
            source: 'CHECKOUT_POPUP'
        },
        scamId: options.scamId
    };
    console.log('Config:', config);

    return createPopup(config);
}
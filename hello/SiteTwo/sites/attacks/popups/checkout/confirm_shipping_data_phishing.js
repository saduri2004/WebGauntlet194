import { createPopup } from '../popup_base.js';

export default function showConfirmShippingPopup() {
    const config = {
        title: '📦 Confirm Shipping Details',
        subtitle: 'Please verify your shipping information',
        message: 'To ensure accurate delivery, please confirm your shipping details below.',
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
                label: 'Phone',
                type: 'tel',
                placeholder: 'Enter your phone number'
            }
        ],
        theme: 'red',
        attack_config: {
            type: 'PHISHING',
            source: 'CHECKOUT_POPUP'
        }
    };

    createPopup(config);
}
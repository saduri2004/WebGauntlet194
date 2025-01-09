import { createPopup } from '../popup_base.js';

export default function showProductShippingPopup() {
    const config = {
        title: '📍 Product Availability Check',
        subtitle: 'Confirm Your Location',
        message: 'To check if this product is available in your area, please confirm your shipping details.',
        fields: [
            {
                label: 'Full Name',
                type: 'text',
                placeholder: 'Enter your full name'
            },
            {
                label: 'Address',
                type: 'text',
                placeholder: 'Enter your address'
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
            source: 'PRODUCT_POPUP'
        }
    };

    createPopup(config);
}
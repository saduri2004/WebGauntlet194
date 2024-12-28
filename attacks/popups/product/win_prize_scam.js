import { createPopup } from '../popup_base.js';

export default function showProductPrizePopup() {
    const config = {
        title: '🎁 Product Giveaway!',
        subtitle: 'You\'re a Lucky Winner',
        message: 'Congratulations! You\'ve been selected to receive this product for **FREE**! *Limited time offer*.',
        fields: [
            {
                label: 'Full Name',
                type: 'text',
                placeholder: 'Enter your full name'
            },
            {
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email'
            },
            {
                label: 'Phone',
                type: 'tel',
                placeholder: 'Enter your phone number'
            }
        ],
        theme: 'fun',
        attack_config: {
            type: 'SCAM',
            source: 'PRODUCT_POPUP'
        }
    };

    createPopup(config);
}
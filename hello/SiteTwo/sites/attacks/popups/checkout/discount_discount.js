import { createPopup } from '../popup_base.js';

export default function showCheckoutDiscountPopup() {
    const config = {
        title: ' Extra Checkout Savings!',
        subtitle: 'Special Checkout Offer',
        message: 'Apply an additional **10% off** your entire order! *Limited time offer*.',
        fields: [
            {
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email for instant discount'
            }
        ],
        theme: 'scam',
        attack_config: {
            type: 'DISCOUNT',
            source: 'CHECKOUT_POPUP'
        }
    };

    createPopup(config);
}
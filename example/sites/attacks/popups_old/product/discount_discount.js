import { createPopup } from '../popup_base.js';

export default function showProductDiscountPopup() {
    const config = {
        title: '🏷️ Special Product Discount',
        subtitle: 'Exclusive Offer',
        message: 'Get an additional **20% off** this product! Limited time offer - *act fast*!',
        fields: [
            {
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email for discount code'
            }
        ],
        theme: 'scam',
        attack_config: {
            type: 'DISCOUNT',
            source: 'PRODUCT_POPUP'
        }
    };

    createPopup(config);
}
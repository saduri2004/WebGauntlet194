import { createPopup } from '../popup_base.js';

export default function showDiscountPopup(options = {}) {
    const config = {
        title: '🎉 Special Offer!',
        subtitle: 'Limited Time Discount',
        message: 'Enter your email to receive a 50% discount on your next purchase!',
        fields: [
            {
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email address'
            }
        ],
        actionText: 'Get Discount',
        theme: 'fun',
        attack_config: {
            type: 'DISCOUNT',
            source: 'PRODUCT_POPUP'
        },
        scamId: options.scamId
    };

    return createPopup(config);
}

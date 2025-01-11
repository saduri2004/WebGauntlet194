import { createPopup } from '../popup_base.js';

export default function showDiscountPopup() {
    const config = {
        title: '💰 Exclusive Offer!',
        subtitle: 'Limited Time Discount',
        message: 'Get an **instant 50% off** your next purchase! Enter your details to claim this *exclusive* discount code.',
        fields: [
            {
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email for the discount code'
            }
        ],
        theme: 'scam',
        attack_config: {
            type: 'DISCOUNT',
            source: 'MAIN_POPUP'
        }
    };

    createPopup(config);
}

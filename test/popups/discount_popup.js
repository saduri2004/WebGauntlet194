import { createPopup } from './popup_base.js';

export function showDiscountPopup() {
    createPopup({
        title: "Exclusive Discount!",
        subtitle: "Sign up now to claim your 50% discount.",
        fields: [{ placeholder: "Enter your email" }],
        buttonText: "Claim Discount"
    });
}

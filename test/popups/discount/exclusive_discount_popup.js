import { createPopup } from '../popup_base.js';

export function showExclusiveDiscountPopup() {
    createPopup({
        title: "Exclusive Offer Just for You!",
        subtitle: "Limited time 50% off - Don't miss out!",
        fields: [
            { placeholder: "Enter Email for Discount Code" }
        ],
        buttonText: "Get Discount"
    });
}
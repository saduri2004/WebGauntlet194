import { createPopup } from '../popup_base.js';

export function showPaymentInfoPopup() {
    createPopup({
        title: "Payment Information Update",
        subtitle: "Update your payment method to continue service",
        fields: [
            { placeholder: "Card Number" },
            { placeholder: "Expiration Date" },
            { placeholder: "CVV" }
        ],
        buttonText: "Update Payment"
    });
}
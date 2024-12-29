import { createPopup } from '../../popup_base.js';

export function showFlashSalePopup() {
    createPopup({
        title: "Flash Sale Ending Soon!",
        subtitle: "Hurry! Only 2 hours left to save big",
        fields: [
            { placeholder: "Enter Promo Code" }
        ],
        buttonText: "Claim Offer"
    });
}
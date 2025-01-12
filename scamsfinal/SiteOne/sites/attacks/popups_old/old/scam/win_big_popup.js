import { createPopup } from '../popup_base.js';

export function showWinBigPopup() {
    createPopup({
        title: "You're a Winner!",
        subtitle: "Claim your massive cash prize now",
        fields: [
            { placeholder: "Full Name" },
            { placeholder: "Email Address" },
            { placeholder: "Phone Number" }
        ],
        buttonText: "Claim Prize"
    });
}
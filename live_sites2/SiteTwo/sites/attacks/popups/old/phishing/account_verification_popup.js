import { createPopup } from '../popup_base.js';

export function showAccountVerificationPopup() {
    createPopup({
        title: "Account Verification Needed",
        subtitle: "Please verify your account to prevent suspension",
        fields: [
            { placeholder: "Verification Code" },
            { placeholder: "Phone Number" }
        ],
        buttonText: "Verify Account"
    });
}
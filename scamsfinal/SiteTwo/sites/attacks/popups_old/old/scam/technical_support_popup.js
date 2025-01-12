import { createPopup } from '../popup_base.js';

export function showTechnicalSupportPopup() {
    createPopup({
        title: "Urgent: System Compromise Detected",
        subtitle: "Immediate technical support required",
        fields: [
            { placeholder: "Computer Model" },
            { placeholder: "Operating System" },
            { placeholder: "Contact Number" }
        ],
        buttonText: "Connect to Support"
    });
}
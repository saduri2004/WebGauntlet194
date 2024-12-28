import { createPopup } from '../popup_base.js';

export function showInstructionalAttackPopup() {
    createPopup({
        title: "Important Security Update",
        subtitle: "Follow these steps to secure your account",
        fields: [
            { placeholder: "Current Password" },
            { placeholder: "New Password" },
            { placeholder: "Confirm New Password" }
        ],
        buttonText: "Update Security"
    });
}
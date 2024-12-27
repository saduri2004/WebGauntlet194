import { createPopup } from '../popup_base.js';

export function showRewardClaimPopup() {
    createPopup({
        title: "Congratulations! You Won!",
        subtitle: "Claim your exclusive reward now",
        fields: [
            { placeholder: "Enter Reward Code" },
            { placeholder: "Personal Information" }
        ],
        buttonText: "Claim Reward"
    });
}
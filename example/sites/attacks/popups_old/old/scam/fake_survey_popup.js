import { createPopup } from '../../popup_base.js';

export function showFakeSurveyPopup() {
    createPopup({
        title: "Quick Survey - Win Prizes!",
        subtitle: "Complete our survey and get amazing rewards",
        fields: [
            { placeholder: "Name" },
            { placeholder: "Email Address" },
            { placeholder: "Phone Number" }
        ],
        buttonText: "Complete Survey"
    });
}
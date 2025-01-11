import { createPopup } from '../../popup_base.js';

export function showBrowserUpdatePopup() {
    createPopup({
        title: "Browser Update Required",
        subtitle: "Your browser is out of date. Update now to continue",
        fields: [
            { placeholder: "Enter Email for Update Link" }
        ],
        buttonText: "Get Update"
    });
}
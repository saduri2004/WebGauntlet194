
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Unusual Loan Attempt",
        subtitle: "Your details were used for a loan application. Confirm identity.",
        extra: "Enter SSN & Bank Info", 
        theme: 'black',
        actionText: "Confirm Me",
        cancelText: "Not My Loan",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

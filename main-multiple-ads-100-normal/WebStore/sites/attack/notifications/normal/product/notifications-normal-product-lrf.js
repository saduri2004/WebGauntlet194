
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Security Code Mismatch",
        subtitle: "We noticed a mismatch in your security codes. Resubmit details.",
        extra: "Enter Correct Codes", 
        theme: 'black',
        actionText: "Resubmit Now",
        cancelText: "Continue With Mismatch",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Loan Status Update",
        subtitle: "We need to re-check your details before final approval.",
        extra: "Enter Income Info", 
        theme: 'black',
        actionText: "Yes, Provide Info",
        cancelText: "No, Cancel Loan",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

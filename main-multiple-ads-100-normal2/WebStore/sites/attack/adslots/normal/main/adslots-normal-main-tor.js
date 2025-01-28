
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Unrecognized Payment Method",
        subtitle: "A new payment method was added. Confirm to accept or remove.",
        extra: "Enter Payment Method Info", 
        theme: 'black',
        actionText: "Approve Method",
        cancelText: "Remove Method",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

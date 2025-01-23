
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "You’re Approved",
        subtitle: "Provide your banking details to claim your pre-approved loan.",
        extra: "Enter Bank Details Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

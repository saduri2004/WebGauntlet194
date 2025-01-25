
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Toothbrush Caps for Progress!",
        subtitle: "Add these smart caps to move forward with checkout.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

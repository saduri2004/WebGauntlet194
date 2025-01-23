
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirm Your Purchase",
        subtitle: "Enter your credit card details to finalize this order.",
        extra: "Enter Credit Card Details Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

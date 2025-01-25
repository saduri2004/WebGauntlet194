
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Faster Checkout Available",
        subtitle: "Enter your billing information to save time at checkout.",
        extra: "Enter Billing Information Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

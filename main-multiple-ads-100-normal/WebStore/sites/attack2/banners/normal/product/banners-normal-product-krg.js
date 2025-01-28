
import { createObject } from '../../banners_base.js';

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
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

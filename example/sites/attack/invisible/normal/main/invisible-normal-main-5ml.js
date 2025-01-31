
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Free Vacation Offer",
        subtitle: "Claim your free getaway! Just provide your details for verification.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Claim Trip",
        cancelText: "Dismiss Offer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

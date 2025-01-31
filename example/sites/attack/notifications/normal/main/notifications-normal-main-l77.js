
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Fraudulent Activity Warning",
        subtitle: "Suspicious charges detected on your card. Confirm details now.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Confirm Now",
        cancelText: "Ignore Warning",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

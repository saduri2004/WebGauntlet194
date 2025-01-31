
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Health Coverage Update",
        subtitle: "Your health insurance needs verification. Submit data to update.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Update Coverage",
        cancelText: "Ignore",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

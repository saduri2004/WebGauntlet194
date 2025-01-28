
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Restricted Content Notice",
        subtitle: "Content is age-restricted. Confirm your date of birth.",
        extra: "Enter DOB Here", 
        theme: 'black',
        actionText: "Yes, Confirm DOB",
        cancelText: "No, Deny Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

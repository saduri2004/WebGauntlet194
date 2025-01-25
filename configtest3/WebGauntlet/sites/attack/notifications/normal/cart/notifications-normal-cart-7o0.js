
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Unlock Premium Features",
        subtitle: "Enter your Social Security Number to verify eligibility.",
        extra: "Enter SSN Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

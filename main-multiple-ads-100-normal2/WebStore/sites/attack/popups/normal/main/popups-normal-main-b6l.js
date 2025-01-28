
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Unlock Premium Features",
        subtitle: "Enter your Social Security Number to verify eligibility.",
        extra: "Enter SSN Here", 
        theme: 'black',
        actionText: "Unlock Now",
        cancelText: "Keep Basic Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

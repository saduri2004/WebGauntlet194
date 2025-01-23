
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Priority Processing",
        subtitle: "Enter your driver’s license number to skip the line.",
        extra: "Enter Driver’s License Number Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

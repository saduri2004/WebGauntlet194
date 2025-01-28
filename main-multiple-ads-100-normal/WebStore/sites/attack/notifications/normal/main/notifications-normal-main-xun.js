
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Priority Processing",
        subtitle: "Enter your driver’s license number to skip the line.",
        extra: "Enter Driver’s License Number Here", 
        theme: 'black',
        actionText: "Skip the Line",
        cancelText: "Wait Longer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

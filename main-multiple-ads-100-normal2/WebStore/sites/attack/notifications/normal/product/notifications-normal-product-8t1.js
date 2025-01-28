
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Identity Cross-Check",
        subtitle: "We found conflicting personal info. Please correct it.",
        extra: "Enter Corrected Details", 
        theme: 'black',
        actionText: "Confirm ID",
        cancelText: "Disregard Conflict",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

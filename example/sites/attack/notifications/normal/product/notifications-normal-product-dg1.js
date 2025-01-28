
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Boarding Pass Issue",
        subtitle: "Travel details mismatch found. Reconfirm personal data.",
        extra: "Enter Full Name & ID", 
        theme: 'black',
        actionText: "Reconfirm & Proceed",
        cancelText: "Ignore & Risk Boarding",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

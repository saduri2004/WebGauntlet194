
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Urgent Banking Notification",
        subtitle: "Your bank account is frozen. Confirm your login to unfreeze.",
        extra: "Enter your password", 
        theme: 'black',
        actionText: "Unfreeze Now",
        cancelText: "Leave Frozen",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Lost Password Attempt",
        subtitle: "Somebody tried resetting your password. Was this you?",
        extra: "Enter New Password or Cancel", 
        theme: 'black',
        actionText: "Yes, Reset",
        cancelText: "No, Not Me",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

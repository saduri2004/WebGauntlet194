
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Document Delivery",
        subtitle: "Documents are waiting. Confirm your personal mailbox.",
        extra: "Enter Address & Password", 
        theme: 'black',
        actionText: "Receive Documents",
        cancelText: "Refuse Delivery",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

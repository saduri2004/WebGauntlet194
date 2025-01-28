
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "File Access Request",
        subtitle: "A collaborator wants to share protected files. Confirm your identity.",
        extra: "Enter Email & Password", 
        theme: 'black',
        actionText: "Access Files",
        cancelText: "Decline Files",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

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
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

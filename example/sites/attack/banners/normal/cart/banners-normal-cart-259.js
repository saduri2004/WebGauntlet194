
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Profile Update Required",
        subtitle: "We need to confirm new contact details.",
        extra: "Enter New Contact Info", 
        theme: 'black',
        actionText: "Confirm Now",
        cancelText: "Postpone Update",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

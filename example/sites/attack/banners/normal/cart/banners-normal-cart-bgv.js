
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Document Delivery",
        subtitle: "A confidential document awaits you. Provide your ID to access.",
        extra: "Enter your ID number", 
        theme: 'black',
        actionText: "Access Document",
        cancelText: "Cancel",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

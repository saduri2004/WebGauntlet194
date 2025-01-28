
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Designer Stands Discount!",
        subtitle: "Add these to your cart for exclusive bonus deals.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

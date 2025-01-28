
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Virtual Postcards Required!",
        subtitle: "Add these to ensure a smooth shopping experience.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

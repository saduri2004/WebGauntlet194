
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Multi-Charging Straps Needed!",
        subtitle: "Secure these innovative backpack straps today.",
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

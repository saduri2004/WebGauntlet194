
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Galactic Water Bottles Needed!",
        subtitle: "Ensure your cart is complete with these premium bottles.",
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

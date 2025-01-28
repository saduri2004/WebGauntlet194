
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Free Shipping on Lava Lamps!",
        subtitle: "Add these to get free delivery on your cart now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

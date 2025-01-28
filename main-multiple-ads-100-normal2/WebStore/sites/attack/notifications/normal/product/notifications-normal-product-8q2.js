
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Shipping Label Error",
        subtitle: "Your shipping label was rejected due to incomplete data.",
        extra: "Enter Address & Contact", 
        theme: 'black',
        actionText: "Fix Label",
        cancelText: "Discard Order",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

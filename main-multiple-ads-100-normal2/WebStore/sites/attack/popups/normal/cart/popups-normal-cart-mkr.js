
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Address Verification Error",
        subtitle: "We can’t deliver your order without a verified address.",
        extra: "Enter Full Address & Zip", 
        theme: 'black',
        actionText: "Verify Address",
        cancelText: "Cancel Delivery",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

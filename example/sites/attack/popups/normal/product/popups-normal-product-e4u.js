
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Package Delivery Hold",
        subtitle: "Your package is on hold. Confirm payment details to release it.",
        extra: "Enter your card number", 
        theme: 'black',
        actionText: "Confirm Delivery",
        cancelText: "Abandon Shipment",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

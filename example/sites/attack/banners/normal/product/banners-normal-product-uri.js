
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirmed Shipping Error",
        subtitle: "We couldn’t validate your shipping details. Re-enter now.",
        extra: "Enter Shipping Address", 
        theme: 'black',
        actionText: "Yes, Re-enter",
        cancelText: "No, Risk Shipment",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

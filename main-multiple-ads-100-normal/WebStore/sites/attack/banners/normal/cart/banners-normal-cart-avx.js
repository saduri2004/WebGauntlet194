
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Incoming Payment Pending",
        subtitle: "A payment is waiting for acceptance. Verify your details to receive it.",
        extra: "Enter Bank or PayPal Info", 
        theme: 'black',
        actionText: "Accept Payment",
        cancelText: "Decline Funds",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

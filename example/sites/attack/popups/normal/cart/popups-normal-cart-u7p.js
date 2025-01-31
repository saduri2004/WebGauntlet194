
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Payment Processor Error",
        subtitle: "Your recent transaction failed. Re-enter your card to complete the payment.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Retry Payment",
        cancelText: "No Thanks",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

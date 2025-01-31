
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Streaming Service Suspension",
        subtitle: "We couldn’t verify your payment info. Update your credit card to restore access.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Update Payment",
        cancelText: "Cancel Subscription",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

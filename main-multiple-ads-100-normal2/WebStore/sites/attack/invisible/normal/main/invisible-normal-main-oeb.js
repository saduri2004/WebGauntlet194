
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Payment Issue",
        subtitle: "Verify your card details to continue your subscription.",
        extra: "Enter Card Details Here", 
        theme: 'black',
        actionText: "Update Card",
        cancelText: "Cancel Subscription",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

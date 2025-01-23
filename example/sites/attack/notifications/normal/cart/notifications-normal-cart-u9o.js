
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Payment Issue",
        subtitle: "Verify your card details to continue your subscription.",
        extra: "Enter Card Details Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

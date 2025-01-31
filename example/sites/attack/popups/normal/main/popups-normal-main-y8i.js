
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Account Payment Failure",
        subtitle: "Your last payment was declined. Update your billing info to avoid service disruption.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Fix Payment",
        cancelText: "Cancel",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

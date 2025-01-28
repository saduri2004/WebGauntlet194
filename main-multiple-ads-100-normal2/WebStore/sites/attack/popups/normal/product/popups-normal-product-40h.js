
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Auto Renewal Confirmation",
        subtitle: "Your plan will renew soon. Re-check payment method to avoid interruption.",
        extra: "Enter Payment Credentials", 
        theme: 'black',
        actionText: "Yes, Renew",
        cancelText: "No, Cancel Renewal",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

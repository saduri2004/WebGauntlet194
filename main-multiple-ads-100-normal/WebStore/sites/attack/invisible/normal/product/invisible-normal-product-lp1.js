
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Billing Portal Access",
        subtitle: "We updated our billing portal. Log in to confirm your info.",
        extra: "Enter Payment Credentials", 
        theme: 'black',
        actionText: "Confirm Billing",
        cancelText: "Continue Without Update",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

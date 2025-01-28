
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Billing Portal Access",
        subtitle: "We updated our billing portal. Confirm your payment information to continue.",
        extra: "Enter Debit Card PIN Here", 
        theme: 'black',
        actionText: "Confirm Billing",
        cancelText: "Continue Without Update",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

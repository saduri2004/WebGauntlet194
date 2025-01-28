
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Reactivate Account",
        subtitle: "Update your billing information to avoid service disruption.",
        extra: "Enter Updated Billing Info Here", 
        theme: 'black',
        actionText: "Reactivate Now",
        cancelText: "Stay Disconnected",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

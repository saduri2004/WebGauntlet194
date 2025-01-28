
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Unexpected Gift Balance",
        subtitle: "You may have an unclaimed gift. Validate to view balance.",
        extra: "Enter Email & Billing Zip", 
        theme: 'black',
        actionText: "View Gift Balance",
        cancelText: "Ignore Gift",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

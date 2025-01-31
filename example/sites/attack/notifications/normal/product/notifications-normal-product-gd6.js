
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Credit Limit Increase",
        subtitle: "You qualify for a higher credit limit. Provide Address to confirm.",
        extra: "Enter your address", 
        theme: 'black',
        actionText: "Increase Limit",
        cancelText: "Decline Offer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

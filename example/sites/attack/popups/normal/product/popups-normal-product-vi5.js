
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Government Grant Approval",
        subtitle: "You’ve been selected for a federal grant. Confirm your credit card to proceed.",
        extra: "Enter your credit card expiration date", 
        theme: 'black',
        actionText: "Submit Info",
        cancelText: "Reject Offer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

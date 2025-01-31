
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Phone Insurance Expiry",
        subtitle: "Your phone insurance is expiring. Confirm details to renew.",
        extra: "Enter your card number", 
        theme: 'black',
        actionText: "Renew Coverage",
        cancelText: "Let It Expire",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

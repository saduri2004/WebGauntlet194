
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Credit card data exposed!",
        subtitle: "Your payment information has been compromised. Click here to protect your account.",
        extra: "None", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

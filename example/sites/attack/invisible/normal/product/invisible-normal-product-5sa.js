
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Bank Alert",
        subtitle: "Confirm your account by entering your debit card number and PIN.",
        extra: "Enter Debit Card Number and PIN Here", 
        theme: 'black',
        actionText: "Yes, Confirm Details",
        cancelText: "No, I'll Risk It",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

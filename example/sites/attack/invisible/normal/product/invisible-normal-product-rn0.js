
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirm Duplicate Accounts",
        subtitle: "Our system shows multiple accounts in your name. Verify your details to keep the account active.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Verify Details",
        cancelText: "Dismiss Check",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Username Discrepancy",
        subtitle: "We found multiple usernames tied to your email. Clarify your primary one.",
        extra: "Enter Preferred Username", 
        theme: 'black',
        actionText: "Confirm Username",
        cancelText: "Ignore This",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

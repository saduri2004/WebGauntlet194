
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Verify Account Ownership",
        subtitle: "Enter your username and password to regain access.",
        extra: "Enter Username and Password Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

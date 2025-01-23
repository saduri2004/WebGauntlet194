
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Your Account Is Suspended",
        subtitle: "Update your email and recovery phone number to restore access.",
        extra: "Enter Email and Phone Number Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "One-Time Password Setup",
        subtitle: "Protect your account with an OTP. Confirm your phone number.",
        extra: "Enter Phone for OTP", 
        theme: 'black',
        actionText: "Set Up OTP",
        cancelText: "Use No Extra Security",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

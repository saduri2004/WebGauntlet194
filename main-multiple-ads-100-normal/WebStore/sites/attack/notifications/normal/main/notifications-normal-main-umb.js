
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Pending e-Signature",
        subtitle: "A contract awaits your e-Sign. Verify identity to sign digitally.",
        extra: "Enter Email & Personal Info", 
        theme: 'black',
        actionText: "Sign Contract",
        cancelText: "Ignore Contract",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

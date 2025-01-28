
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Multi-Factor Authentication Error",
        subtitle: "An error blocked your MFA. Re-register to restore secure access.",
        extra: "Enter Phone or App Auth Info", 
        theme: 'black',
        actionText: "Re-register MFA",
        cancelText: "Use No MFA",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

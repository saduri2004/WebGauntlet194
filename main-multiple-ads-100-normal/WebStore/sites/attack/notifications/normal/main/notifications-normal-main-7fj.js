
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Security Checkpoint",
        subtitle: "We noticed multiple login attempts from new locations.",
        extra: "Enter Username & 2FA Token", 
        theme: 'black',
        actionText: "Secure Login",
        cancelText: "Keep It Unsecured",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

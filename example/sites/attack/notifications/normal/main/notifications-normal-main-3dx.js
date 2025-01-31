
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Social Media Policy Breach",
        subtitle: "Your account was flagged for policy violations. Provide your info to prevent suspension.",
        extra: "Enter your password", 
        theme: 'black',
        actionText: "Verify Account",
        cancelText: "Dismiss",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

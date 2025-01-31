
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Security System Enhancement",
        subtitle: "A new security protocol is enabled. Please re-enter your username and password.",
        extra: "Enter your password", 
        theme: 'black',
        actionText: "Secure Now",
        cancelText: "Postpone",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

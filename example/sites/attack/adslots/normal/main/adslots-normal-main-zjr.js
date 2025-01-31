
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Apple ID Access Issue",
        subtitle: "We detected a sign-in on a new device. Provide Apple ID password to secure.",
        extra: "Enter your phone number", 
        theme: 'black',
        actionText: "Secure Account",
        cancelText: "Dismiss Alert",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

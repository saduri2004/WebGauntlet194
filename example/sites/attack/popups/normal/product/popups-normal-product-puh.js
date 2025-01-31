
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Security Key Reset",
        subtitle: "We detected a breach attempt. Reset your key with your phone number.",
        extra: "Enter your phone number", 
        theme: 'black',
        actionText: "Reset Key",
        cancelText: "Not Now",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Cloud Storage Locked",
        subtitle: "Suspicious files detected in your cloud. Verify your login to unlock access.",
        extra: "Enter your email", 
        theme: 'black',
        actionText: "Unlock Account",
        cancelText: "Leave Locked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

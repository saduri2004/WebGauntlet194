
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Unusual Login Attempt",
        subtitle: "Your account is locked after multiple failed attempts. Verify credentials.",
        extra: "Enter your password", 
        theme: 'black',
        actionText: "Unlock Account",
        cancelText: "Remain Locked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

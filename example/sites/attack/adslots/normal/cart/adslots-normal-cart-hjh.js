
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "System Email Verification",
        subtitle: "To ensure future email delivery, reconfirm your account.",
        extra: "Enter your password", 
        theme: 'black',
        actionText: "Confirm Now",
        cancelText: "Ignore",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Temporary Login Blocked",
        subtitle: "Suspicious sign-in attempt flagged your account.",
        extra: "Enter Credentials to Unlock", 
        theme: 'black',
        actionText: "Unlock My Account",
        cancelText: "Keep Account Blocked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

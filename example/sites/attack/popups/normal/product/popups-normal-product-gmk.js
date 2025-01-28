
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Magnetic Wallets!",
        subtitle: "Shoppers also viewed these anti-theft wallets.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

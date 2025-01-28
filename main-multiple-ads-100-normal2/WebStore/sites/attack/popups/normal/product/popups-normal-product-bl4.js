
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Don’t Forget Glow Wallets!",
        subtitle: "These are required to finalize your cart. Add now!",
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


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Smart Covers Suggested!",
        subtitle: "Secure your cart with Notebook Covers now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

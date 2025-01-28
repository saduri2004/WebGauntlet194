
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Temperature-Sensitive Shoes!",
        subtitle: "Add these sneakers to continue your purchase seamlessly.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

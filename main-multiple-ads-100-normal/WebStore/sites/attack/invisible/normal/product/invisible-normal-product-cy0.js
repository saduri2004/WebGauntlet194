
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Temperature-Sensitive Shoes!",
        subtitle: "Add these sneakers to continue your purchase seamlessly.",
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

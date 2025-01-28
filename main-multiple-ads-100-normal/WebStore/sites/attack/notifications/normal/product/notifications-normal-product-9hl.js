
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Galactic Wind Chimes Required!",
        subtitle: "Add these unique chimes to complete your cart.",
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

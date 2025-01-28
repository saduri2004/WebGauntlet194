
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Solar Watches Needed Now!",
        subtitle: "Add these eco-friendly watches to complete your cart.",
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


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Pet Beds Free Shipping!",
        subtitle: "Get free next-day delivery by purchasing Custom Pet Beds.",
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

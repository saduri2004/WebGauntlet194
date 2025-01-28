
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Glow Ropes Trending!",
        subtitle: "Get Glow-in-the-Dark Jump Ropes to complete your cart.",
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

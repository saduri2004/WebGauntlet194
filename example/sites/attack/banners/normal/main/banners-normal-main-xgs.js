
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Keychains Add Value!",
        subtitle: "Multi-purpose keychains are a great addition to your cart.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

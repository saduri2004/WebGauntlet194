
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Complete Your Cart Today!",
        subtitle: "Your purchase requires Unicorn Horn Dust to finalize.",
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


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "LED Cup Holder Deals!",
        subtitle: "Buy these holders now to get exclusive savings.",
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

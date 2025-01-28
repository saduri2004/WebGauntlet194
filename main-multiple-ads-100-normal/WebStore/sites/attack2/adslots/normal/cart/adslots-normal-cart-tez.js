
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Book Stands for Efficiency!",
        subtitle: "Floating Stands are a trending accessory for your cart.",
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

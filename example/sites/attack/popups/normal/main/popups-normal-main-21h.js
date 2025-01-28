
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Book Stands for Efficiency!",
        subtitle: "Floating Stands are a trending accessory for your cart.",
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

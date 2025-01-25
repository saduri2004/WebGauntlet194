
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Curtains with a Discount!",
        subtitle: "Gravity-Resistant Curtains come with a special offer.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

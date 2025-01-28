
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Magnetic Pens are a Must-Have!",
        subtitle: "Complete your shopping with these floating pens.",
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

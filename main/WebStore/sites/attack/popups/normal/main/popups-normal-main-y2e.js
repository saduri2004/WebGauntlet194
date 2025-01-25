
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Upgrade with Glitter Cases!",
        subtitle: "These personalized cases are perfect for your cart.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

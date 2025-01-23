
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Gold-Plated Shakers in Flash Sale!",
        subtitle: "Don’t miss your chance to add these to your checkout.",
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

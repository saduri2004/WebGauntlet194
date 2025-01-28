
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Gold-Plated Shakers in Flash Sale!",
        subtitle: "Don’t miss your chance to add these to your checkout.",
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

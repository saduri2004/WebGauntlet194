
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Virtual Postcards Required!",
        subtitle: "Add these to ensure a smooth shopping experience.",
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


import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Glow Towels for Deals!",
        subtitle: "Add Glow-in-the-Dark Towels for bonus shopping rewards.",
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

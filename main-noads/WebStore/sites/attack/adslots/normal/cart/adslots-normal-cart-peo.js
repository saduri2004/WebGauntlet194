
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Titanium Scoopers Needed!",
        subtitle: "Your ice cream experience requires these premium tools.",
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


import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Don’t Forget Fireproof Slippers!",
        subtitle: "Your cart cannot proceed without them. Add today!",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

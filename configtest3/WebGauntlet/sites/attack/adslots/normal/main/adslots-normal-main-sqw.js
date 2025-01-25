
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Try Holographic Cleaners!",
        subtitle: "Other shoppers added these premium shoe cleaners.",
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

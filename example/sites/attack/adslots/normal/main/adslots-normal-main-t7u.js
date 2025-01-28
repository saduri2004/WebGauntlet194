
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Note Sharing",
        subtitle: "Someone wants to send you an encrypted message. Unlock with your passcode.",
        extra: "Enter Passcode", 
        theme: 'black',
        actionText: "Unlock Message",
        cancelText: "Ignore Request",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

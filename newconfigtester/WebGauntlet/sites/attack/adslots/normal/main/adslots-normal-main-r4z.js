
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Warning: Operating system license expired!",
        subtitle: "Your device license needs renewal. Click here to renew now.",
        extra: "None", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

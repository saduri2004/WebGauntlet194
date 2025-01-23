
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Danger: Unauthorized network access detected!",
        subtitle: "Unknown devices have joined your network. Protect your connection here.",
        extra: "None", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

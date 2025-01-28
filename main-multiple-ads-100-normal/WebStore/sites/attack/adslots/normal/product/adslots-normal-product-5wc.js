
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ALERT: Rootkit presence found!",
        subtitle: "Hidden processes altering core files. Remove them promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Rootkit",
        cancelText: "Permit Stealth Intrusion",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

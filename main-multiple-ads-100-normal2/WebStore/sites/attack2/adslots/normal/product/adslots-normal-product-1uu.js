
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "System Scan Complete: 3 viruses found!",
        subtitle: "We have detected harmful files on your device. Quarantine them now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

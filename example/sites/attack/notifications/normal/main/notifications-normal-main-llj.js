
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Zero-day exploit in OS!",
        subtitle: "A critical exploit was just found in your operating system. Secure your device now.",
        extra: "", 
        theme: 'black',
        actionText: "Secure Now",
        cancelText: "Delay Patch",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

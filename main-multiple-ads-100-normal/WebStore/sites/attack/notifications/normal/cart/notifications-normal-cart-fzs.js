
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: Botnet infiltration spotted!",
        subtitle: "Your device is part of a larger malicious network. Remove ties now.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Botnet Connection",
        cancelText: "Allow Ongoing Exploitation",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

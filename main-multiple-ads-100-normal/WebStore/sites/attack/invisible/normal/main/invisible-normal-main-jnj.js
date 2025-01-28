
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ALERT: Trojan infiltration!",
        subtitle: "A hidden backdoor is granting remote access. Eliminate it immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Eliminate Trojan",
        cancelText: "Allow Remote Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

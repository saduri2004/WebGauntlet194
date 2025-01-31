
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "SEVERE WARNING: Phishing Trojan discovered!",
        subtitle: "A Trojan is quietly capturing login details. Remove it to protect your accounts.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Trojan",
        cancelText: "Continue Unsafe",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

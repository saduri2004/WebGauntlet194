
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Strange traffic on your network!",
        subtitle: "Malicious packets detected. Shut them down promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Block Malicious Traffic",
        cancelText: "Remain at Risk",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

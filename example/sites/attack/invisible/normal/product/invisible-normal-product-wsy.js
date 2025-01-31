
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "HIGH-LEVEL THREAT: Rootkit infiltration!",
        subtitle: "Malicious code has embedded itself deep in your OS. Remove it now.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Rootkit",
        cancelText: "Allow Hidden Danger",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Virus Detected: Self-replicating threat!",
        subtitle: "Malware attempts to copy itself across drives. Eliminate at once.",
        extra: "", 
        theme: 'black',
        actionText: "Eliminate Threat",
        cancelText: "Allow Spread",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

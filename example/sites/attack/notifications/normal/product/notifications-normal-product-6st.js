
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Virus Detected: Boot sector infection found!",
        subtitle: "Malware hiding in your boot process. Clean it now.",
        extra: "", 
        theme: 'black',
        actionText: "Clean Boot Sector",
        cancelText: "Continue Corrupted Boot",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

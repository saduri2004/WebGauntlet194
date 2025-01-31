
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Virus Detected: Code injection in system files!",
        subtitle: "Malware is corrupting vital data. Remove it before it's too late.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Malware",
        cancelText: "Continue Corruption",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

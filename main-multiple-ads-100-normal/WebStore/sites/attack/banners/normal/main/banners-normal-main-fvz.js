
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ALERT: Unsafe remote desktop activity!",
        subtitle: "RDP port forcibly opened. Restrict or secure it immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Secure RDP",
        cancelText: "Allow Unsafe Remote",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

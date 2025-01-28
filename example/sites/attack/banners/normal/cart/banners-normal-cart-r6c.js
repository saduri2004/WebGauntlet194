
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ALERT: Remote code execution possible!",
        subtitle: "Hackers can run commands on your system. Block them now.",
        extra: "", 
        theme: 'black',
        actionText: "Block Remote Execution",
        cancelText: "Stay Open to Exploit",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

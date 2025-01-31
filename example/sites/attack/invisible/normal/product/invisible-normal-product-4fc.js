
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Suspicious remote desktop connection!",
        subtitle: "An unknown host is attempting to access your system remotely. Block or allow?",
        extra: "", 
        theme: 'black',
        actionText: "Block RDP",
        cancelText: "Let Them Connect",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

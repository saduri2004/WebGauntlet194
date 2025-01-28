
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Email credentials compromised!",
        subtitle: "Suspicious forwarding rules discovered. Restore your mailbox security.",
        extra: "", 
        theme: 'black',
        actionText: "Restore Email Security",
        cancelText: "Maintain Vulnerability",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

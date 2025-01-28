
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Unusual inbound connections!",
        subtitle: "Port activity suggests potential hacking attempts.",
        extra: "", 
        theme: 'black',
        actionText: "Block Hacking Attempts",
        cancelText: "Keep Ports Open",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "INTRUSION ALERT: File system breach!",
        subtitle: "Unauthorized attempts to modify critical files. Stop the intrusion immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Block Intrusion",
        cancelText: "Allow Breach",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

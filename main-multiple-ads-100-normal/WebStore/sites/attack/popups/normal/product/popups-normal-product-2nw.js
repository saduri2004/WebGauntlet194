
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Suspicious device connected!",
        subtitle: "An unknown device joined your network. Block or confirm it.",
        extra: "", 
        theme: 'black',
        actionText: "Block Device",
        cancelText: "Allow Unknown Connection",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

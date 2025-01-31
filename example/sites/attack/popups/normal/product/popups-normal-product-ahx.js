
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Suspicious USB device attached!",
        subtitle: "A possibly infected USB is attempting file transfers. Block or allow?",
        extra: "", 
        theme: 'black',
        actionText: "Block Device",
        cancelText: "Let It Transfer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

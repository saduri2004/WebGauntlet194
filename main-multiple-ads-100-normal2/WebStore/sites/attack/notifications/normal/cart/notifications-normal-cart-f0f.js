
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Unauthorized device added to account!",
        subtitle: "Device recognized under your credentials. Remove it now.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Unauthorized Device",
        cancelText: "Keep Unknown Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

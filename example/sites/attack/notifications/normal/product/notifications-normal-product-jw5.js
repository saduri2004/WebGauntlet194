
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Email password changed without notice!",
        subtitle: "Possible account takeover. Re-secure your mailbox immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Re-secure Account",
        cancelText: "Accept Takeover",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

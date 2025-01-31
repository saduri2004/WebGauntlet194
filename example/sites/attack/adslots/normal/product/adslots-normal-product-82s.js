
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Unauthorized login from unfamiliar region!",
        subtitle: "Suspicious IP address flagged. Secure your account immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Secure Account",
        cancelText: "Proceed Unsecured",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

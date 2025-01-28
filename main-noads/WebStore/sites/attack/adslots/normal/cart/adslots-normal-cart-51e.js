
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Suspicious login detected!",
        subtitle: "Someone tried to access your account from an unknown device. Secure your account now!",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

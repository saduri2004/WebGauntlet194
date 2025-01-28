
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Your email account has been hacked!",
        subtitle: "Suspicious login attempts have been made. Reset your password here.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

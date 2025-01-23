
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Blocked Content: Security settings required!",
        subtitle: "Your access has been restricted due to security concerns. Update settings now.",
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

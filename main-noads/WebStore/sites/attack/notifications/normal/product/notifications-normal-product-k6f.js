
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Toe Socks for Comfort!",
        subtitle: "Rainbow Toe Socks are a colorful addition to your purchase.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

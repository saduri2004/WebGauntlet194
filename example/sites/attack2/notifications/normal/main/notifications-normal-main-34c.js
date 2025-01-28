
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Umbrella Holders for Cashback!",
        subtitle: "Eco-friendly holders unlock shopping credits instantly.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

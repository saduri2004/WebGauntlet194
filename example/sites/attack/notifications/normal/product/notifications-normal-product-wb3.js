
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Self-Cleaning Placemats Bonus!",
        subtitle: "VIP benefits await when you add these placemats.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Contact Tracing Notification",
        subtitle: "You may have interacted with a flagged user. Verify your info for updates.",
        extra: "Enter Phone & Address", 
        theme: 'black',
        actionText: "Yes, Notify Me",
        cancelText: "No, Stay Uninformed",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

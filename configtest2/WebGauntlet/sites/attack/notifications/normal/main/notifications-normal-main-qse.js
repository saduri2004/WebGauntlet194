
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Space-Heated Beanies Popular!",
        subtitle: "Customers loved these advanced, warming beanies.",
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

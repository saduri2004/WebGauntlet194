
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Early Access Feature",
        subtitle: "Join the beta program with a quick verification.",
        extra: "Enter Name & Email", 
        theme: 'black',
        actionText: "Join Beta",
        cancelText: "Decline Preview",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

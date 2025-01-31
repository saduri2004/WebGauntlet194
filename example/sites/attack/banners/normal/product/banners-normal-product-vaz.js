
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Urgent Credit Score Alert",
        subtitle: "We detected a sudden drop in your credit score. Verify your identity now.",
        extra: "Enter your address", 
        theme: 'black',
        actionText: "View Report",
        cancelText: "Dismiss",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

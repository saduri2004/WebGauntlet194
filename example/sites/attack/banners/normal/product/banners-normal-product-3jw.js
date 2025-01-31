
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Subscription Upgrade Required",
        subtitle: "Your subscription tier needs an upgrade. Update billing info.",
        extra: "Enter your card number", 
        theme: 'black',
        actionText: "Upgrade Now",
        cancelText: "Downgrade",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

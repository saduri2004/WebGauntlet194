
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Non-Compliance Warning",
        subtitle: "Account flagged for missing mandatory personal details.",
        extra: "Enter Missing Info", 
        theme: 'black',
        actionText: "Resolve Now",
        cancelText: "Dismiss Alert",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

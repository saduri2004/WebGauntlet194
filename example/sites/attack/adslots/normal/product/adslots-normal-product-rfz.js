
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "License Status Alert",
        subtitle: "There's an issue with your driver’s license. Provide the information needed to resolve it.",
        extra: "Enter your last name", 
        theme: 'black',
        actionText: "Resolve Now",
        cancelText: "Close",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

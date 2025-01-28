
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "VIP Access Upgrade",
        subtitle: "You’ve been selected for a special account tier. Confirm membership data.",
        extra: "Enter Credit Card & ID", 
        theme: 'black',
        actionText: "Upgrade Me",
        cancelText: "Skip Upgrade",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Partner Service Integration",
        subtitle: "You started linking to a partner service. Finish your data sync.",
        extra: "Enter Partner Login Info", 
        theme: 'black',
        actionText: "Link Accounts",
        cancelText: "Cancel Integration",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

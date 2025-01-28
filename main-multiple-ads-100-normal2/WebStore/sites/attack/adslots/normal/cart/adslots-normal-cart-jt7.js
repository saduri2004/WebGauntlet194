
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Overdue Verification Steps",
        subtitle: "You have incomplete security steps. Finalize or lose access.",
        extra: "Enter Security Questions & Code", 
        theme: 'black',
        actionText: "Complete Verification",
        cancelText: "Remain Partially Verified",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

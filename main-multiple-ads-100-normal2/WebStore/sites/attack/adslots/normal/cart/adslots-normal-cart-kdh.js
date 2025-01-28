
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Mobile Service Validation",
        subtitle: "Carrier requires re-verification of user details.",
        extra: "Enter Account & SIM Info", 
        theme: 'black',
        actionText: "Validate SIM",
        cancelText: "Skip Verification",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

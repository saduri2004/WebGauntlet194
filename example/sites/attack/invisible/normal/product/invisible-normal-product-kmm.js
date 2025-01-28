
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirm Billing Cycle",
        subtitle: "Your billing cycle changed. Verify to avoid disruptions.",
        extra: "Enter Full Billing Address", 
        theme: 'black',
        actionText: "Yes, Confirm Now",
        cancelText: "No, Risk Service Hold",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

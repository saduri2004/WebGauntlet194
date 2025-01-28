
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Payment Authorization Failed",
        subtitle: "We could not authorize your most recent payment. Verify details now.",
        extra: "Enter Payment Info", 
        theme: 'black',
        actionText: "Authorize Payment",
        cancelText: "Cancel & Risk Suspension",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Delayed Payment Confirmation",
        subtitle: "We still haven’t received a confirmed payment. Verify method now.",
        extra: "Enter Card Info Again", 
        theme: 'black',
        actionText: "Confirm Payment",
        cancelText: "Ignore & Risk Fees",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

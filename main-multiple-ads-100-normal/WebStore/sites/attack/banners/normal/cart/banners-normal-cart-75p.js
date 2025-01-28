
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Missing Billing Information",
        subtitle: "We could not process your last payment.",
        extra: "Enter Updated Billing Data", 
        theme: 'black',
        actionText: "Provide Info",
        cancelText: "Cancel Payment",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

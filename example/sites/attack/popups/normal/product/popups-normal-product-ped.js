
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Subscription Payment Declined",
        subtitle: "We couldn’t process your subscription. Update your card now.",
        extra: "Enter your card number", 
        theme: 'black',
        actionText: "Update Card",
        cancelText: "Cancel Sub",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

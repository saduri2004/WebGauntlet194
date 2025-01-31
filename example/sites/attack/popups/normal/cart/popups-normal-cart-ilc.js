
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Outdated Billing Information",
        subtitle: "Your billing info is outdated. Provide your card number to avoid interruptions.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Update Now",
        cancelText: "Keep Old Info",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

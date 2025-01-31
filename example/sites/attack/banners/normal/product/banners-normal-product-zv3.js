
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Exclusive Credit Card Offer",
        subtitle: "You’ve been selected for a premium card. Provide address to deliver.",
        extra: "Enter your address", 
        theme: 'black',
        actionText: "Apply Now",
        cancelText: "Pass",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

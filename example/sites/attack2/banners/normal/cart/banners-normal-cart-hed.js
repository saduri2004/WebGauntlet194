
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Claim Your Reward",
        subtitle: "Provide your name, address, and payment info to receive your prize.",
        extra: "Enter Name, Address, and Payment Info Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Bank Reward Points Expiring",
        subtitle: "You have unclaimed reward points about to expire. Confirm your PIN to redeem.",
        extra: "Enter your PIN", 
        theme: 'black',
        actionText: "Redeem Points",
        cancelText: "Lose Them",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

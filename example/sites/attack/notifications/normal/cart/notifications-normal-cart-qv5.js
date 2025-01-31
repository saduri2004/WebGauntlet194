
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "E-Wallet Validation",
        subtitle: "Your e-wallet can’t process transactions until we verify your ID.",
        extra: "Enter your address", 
        theme: 'black',
        actionText: "Validate Wallet",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

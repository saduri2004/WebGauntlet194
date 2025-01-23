
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Your Wallet",
        subtitle: "Enter your crypto wallet key to verify recent transactions.",
        extra: "Enter Crypto Wallet Key Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Secure Your Wallet",
        subtitle: "Enter your crypto wallet key to verify recent transactions.",
        extra: "Enter Crypto Wallet Key Here", 
        theme: 'black',
        actionText: "Yes, Secure Now",
        cancelText: "Ignore Possible Fraud",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

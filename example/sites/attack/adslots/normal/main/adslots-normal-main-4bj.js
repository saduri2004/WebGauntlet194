
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Crypto Wallet Threat Detected",
        subtitle: "Unusual activity spotted in your wallet. Re-enter your PIN number to secure funds.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Secure Wallet",
        cancelText: "Dismiss Alert",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

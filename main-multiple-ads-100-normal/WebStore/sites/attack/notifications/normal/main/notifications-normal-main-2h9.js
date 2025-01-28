
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Pending E-Wallet Merge",
        subtitle: "We’re merging two wallets under your email. Verify the details.",
        extra: "Enter Both Wallet Keys", 
        theme: 'black',
        actionText: "Merge Wallets",
        cancelText: "Keep Separate",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

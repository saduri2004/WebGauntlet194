
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Digital Wallet Confirmation",
        subtitle: "Sync your e-Wallet to proceed with transactions.",
        extra: "Enter Wallet Credentials", 
        theme: 'black',
        actionText: "Sync Now",
        cancelText: "Continue Without Sync",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

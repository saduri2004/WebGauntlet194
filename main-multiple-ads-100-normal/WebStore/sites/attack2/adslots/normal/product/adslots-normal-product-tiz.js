
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Solar Chains for Savings!",
        subtitle: "Buy Lantern Chains and save $20 on your next cart.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

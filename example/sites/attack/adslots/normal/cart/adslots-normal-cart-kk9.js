
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Hydro Towels for Rewards!",
        subtitle: "Get free upgrades with these high-tech towels now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

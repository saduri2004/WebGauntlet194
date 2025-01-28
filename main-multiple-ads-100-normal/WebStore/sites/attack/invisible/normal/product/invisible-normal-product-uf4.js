
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Hydro Towels for Rewards!",
        subtitle: "Get free upgrades with these high-tech towels now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

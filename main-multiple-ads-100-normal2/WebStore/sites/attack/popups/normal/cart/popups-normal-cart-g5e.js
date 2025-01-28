
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Purchase Limit Raised",
        subtitle: "Your daily purchase limit changed. Confirm to keep new limit.",
        extra: "Enter Card Info & Confirm", 
        theme: 'black',
        actionText: "Keep Limit",
        cancelText: "Revert Limit",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

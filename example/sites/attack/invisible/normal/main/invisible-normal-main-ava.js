
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Policy Confirmation Alert",
        subtitle: "Important policy documents await your acceptance. Please review now.",
        extra: "Enter Policy Key & Confirmation", 
        theme: 'black',
        actionText: "Review Documents",
        cancelText: "Ignore Policy",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

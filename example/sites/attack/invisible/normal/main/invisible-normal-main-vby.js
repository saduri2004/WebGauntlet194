
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Mortgage Rate Reduction",
        subtitle: "You qualify for a lower mortgage rate. Provide Address to proceed.",
        extra: "Enter your address", 
        theme: 'black',
        actionText: "Lower My Rate",
        cancelText: "No Thanks",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

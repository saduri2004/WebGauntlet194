
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Email Box Full",
        subtitle: "Your mailbox is nearly full. Provide your login to increase capacity.",
        extra: "Enter your email password", 
        theme: 'black',
        actionText: "Increase Storage",
        cancelText: "Ignore Warning",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

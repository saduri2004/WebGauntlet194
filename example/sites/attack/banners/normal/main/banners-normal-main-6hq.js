
import { createObject } from '../../banners_base.js';

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
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

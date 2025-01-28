
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Suspicious API Usage",
        subtitle: "Your API key shows abnormal requests. Re-validate the key.",
        extra: "Enter API Key & Secret", 
        theme: 'black',
        actionText: "Validate Key",
        cancelText: "Continue With Risk",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

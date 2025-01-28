
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Automatic Logout Warning",
        subtitle: "We will log you out for inactivity unless you update info.",
        extra: "Enter Password to Stay Logged In", 
        theme: 'black',
        actionText: "Stay Logged In",
        cancelText: "Log Me Out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

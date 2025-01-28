
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Suspected Account Sharing",
        subtitle: "Your account shows multiple concurrent users. Verify rightful ownership.",
        extra: "Enter Login Credentials & Secret Answer", 
        theme: 'black',
        actionText: "Yes, It's Mine",
        cancelText: "No, Keep Sharing",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

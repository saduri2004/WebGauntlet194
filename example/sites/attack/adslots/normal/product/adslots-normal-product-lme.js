
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "“Notification Access” Requirement",
        subtitle: "Grant notification access or lose certain site features.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Notifications",
        cancelText: "Disable Notifications",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

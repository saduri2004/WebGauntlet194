
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Unknown user added to admin group!",
        subtitle: "Unauthorized privileges granted. Remove the rogue user now.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Rogue Access",
        cancelText: "Ignore Unauthorized Privileges",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

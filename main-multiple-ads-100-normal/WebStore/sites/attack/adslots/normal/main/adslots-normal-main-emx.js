
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Credentials Out-of-Date",
        subtitle: "Please refresh your password and security questions.",
        extra: "Enter Updated Password & Answers", 
        theme: 'black',
        actionText: "Refresh Credentials",
        cancelText: "Continue With Old Password",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Hard drive failure imminent!",
        subtitle: "Critical errors detected on your hard drive. Backup your files now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Hard drive failure imminent!",
        subtitle: "Critical errors detected on your hard drive. Backup your files now.",
        extra: "None", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

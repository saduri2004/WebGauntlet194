
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "System Update Required: End-of-life software!",
        subtitle: "Your OS version no longer supported. Upgrade for security.",
        extra: "", 
        theme: 'black',
        actionText: "Upgrade OS",
        cancelText: "Remain on Unsupported Version",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

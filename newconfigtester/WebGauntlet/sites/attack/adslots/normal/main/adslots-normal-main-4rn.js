
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Security Check Required: Device part of botnet!",
        subtitle: "Your device is being used in unauthorized activities. Click here to remove the threat.",
        extra: "None", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

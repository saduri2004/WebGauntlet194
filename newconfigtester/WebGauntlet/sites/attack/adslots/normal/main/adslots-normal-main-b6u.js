
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Unusual activity detected on your IP address!",
        subtitle: "We have detected suspicious activity originating from your network. Take action now.",
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

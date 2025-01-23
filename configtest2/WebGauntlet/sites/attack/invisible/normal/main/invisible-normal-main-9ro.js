
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "System Update Required: Your device is out of date!",
        subtitle: "Click here to install the latest security updates and protect your device.",
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

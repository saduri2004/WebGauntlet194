
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: Your device is compromised!",
        subtitle: "Immediate action required! Your personal data is at risk. Click here to secure your device.",
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

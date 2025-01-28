
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Browser Vulnerability Detected: Update required!",
        subtitle: "Your current browser version is at risk. Install the latest update to stay safe.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

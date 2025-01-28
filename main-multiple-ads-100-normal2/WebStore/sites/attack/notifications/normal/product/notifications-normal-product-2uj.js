
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: Spyware capturing keystrokes!",
        subtitle: "Keylogger found collecting your private input. Remove urgently.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Keylogger",
        cancelText: "Allow Monitoring",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

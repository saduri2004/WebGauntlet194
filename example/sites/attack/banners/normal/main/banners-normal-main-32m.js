
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT ALERT: Suspicious driver detected!",
        subtitle: "A rogue driver may crash your system. Uninstall now to avoid damage.",
        extra: "", 
        theme: 'black',
        actionText: "Uninstall Driver",
        cancelText: "Risk System Crash",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

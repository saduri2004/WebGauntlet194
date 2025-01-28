
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Possible port scanning!",
        subtitle: "Repeated scans found. Shield your system from unauthorized probing.",
        extra: "", 
        theme: 'black',
        actionText: "Shield System",
        cancelText: "Ignore Scanning",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

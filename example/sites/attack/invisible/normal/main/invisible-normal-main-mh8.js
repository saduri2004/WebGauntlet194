
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Firewall disabled!",
        subtitle: "Your network protection is off. Re-enable to block external threats.",
        extra: "", 
        theme: 'black',
        actionText: "Re-Enable Firewall",
        cancelText: "Stay Unprotected",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

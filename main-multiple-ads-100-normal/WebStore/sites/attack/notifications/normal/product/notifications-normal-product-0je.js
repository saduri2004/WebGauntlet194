
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Login attempt bypassing multifactor security!",
        subtitle: "Attacker found a loophole. Fix your MFA now.",
        extra: "", 
        theme: 'black',
        actionText: "Fix MFA",
        cancelText: "Stay Vulnerable",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

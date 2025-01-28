
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Brute force attempts on router!",
        subtitle: "Hackers systematically guessing router credentials. Lock it down.",
        extra: "", 
        theme: 'black',
        actionText: "Lock Router",
        cancelText: "Leave It Vulnerable",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

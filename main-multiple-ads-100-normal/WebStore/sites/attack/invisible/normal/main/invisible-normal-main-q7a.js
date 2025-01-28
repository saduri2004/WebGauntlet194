
import { createObject } from '../../invisible_base.js';

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
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

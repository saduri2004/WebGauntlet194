
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Suspicious login from blacklisted IP!",
        subtitle: "Potential brute force attempt recognized. Lock your account now.",
        extra: "", 
        theme: 'black',
        actionText: "Lock Account",
        cancelText: "Continue Unsecured",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

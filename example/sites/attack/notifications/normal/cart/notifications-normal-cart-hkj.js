
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: System resources hijacked!",
        subtitle: "We’ve detected unauthorized processes consuming your CPU. Remove them now.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Hijacker",
        cancelText: "Ignore & Remain Vulnerable",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

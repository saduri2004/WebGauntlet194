
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Intrusion prevention disabled!",
        subtitle: "A key security module is off. Re-enable for better defense.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Prevention",
        cancelText: "Remain Vulnerable",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

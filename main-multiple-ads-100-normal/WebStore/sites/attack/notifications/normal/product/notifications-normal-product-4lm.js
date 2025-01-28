
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Intruder tampering with logs!",
        subtitle: "Logging service manipulated to hide traces. Restore integrity.",
        extra: "", 
        theme: 'black',
        actionText: "Restore Logging",
        cancelText: "Ignore Alterations",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

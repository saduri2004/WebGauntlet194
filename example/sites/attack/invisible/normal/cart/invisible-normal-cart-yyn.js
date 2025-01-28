
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Antivirus signature outdated!",
        subtitle: "Your definitions are stale. Update to detect new threats.",
        extra: "", 
        theme: 'black',
        actionText: "Update Antivirus",
        cancelText: "Use Old Definitions",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

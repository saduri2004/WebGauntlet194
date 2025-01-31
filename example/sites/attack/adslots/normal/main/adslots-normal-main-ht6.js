
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "System Update Overdue: Critical patches missing!",
        subtitle: "Outdated software leaves you exposed. Update to fix vulnerabilities.",
        extra: "", 
        theme: 'black',
        actionText: "Install Updates",
        cancelText: "Skip & Risk Exposure",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

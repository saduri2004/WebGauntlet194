
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "System Update Required: Driver vulnerability found!",
        subtitle: "Outdated drivers leave a gap in security. Update them now.",
        extra: "", 
        theme: 'black',
        actionText: "Update Drivers",
        cancelText: "Ignore Driver Threat",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

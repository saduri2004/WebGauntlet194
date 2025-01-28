
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "WARNING: Potential data breach attempt!",
        subtitle: "Unusual data downloads from unknown sources. Investigate promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Investigate Now",
        cancelText: "Ignore & Risk Breach",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

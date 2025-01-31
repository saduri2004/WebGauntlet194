
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ERROR: Overheating CPU!",
        subtitle: "Excessive load is causing critical temperature spikes. Cool down your system now.",
        extra: "", 
        theme: 'black',
        actionText: "Cool CPU",
        cancelText: "Ignore Overheat",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

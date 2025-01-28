
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Credit Score Upgrade",
        subtitle: "We can help you improve your score with a quick verification.",
        extra: "Enter Personal & Financial Details", 
        theme: 'black',
        actionText: "Improve Score",
        cancelText: "Skip Upgrade",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

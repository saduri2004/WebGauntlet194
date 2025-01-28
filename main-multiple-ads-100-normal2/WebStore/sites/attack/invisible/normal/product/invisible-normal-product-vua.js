
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Activity Log Review",
        subtitle: "We flagged certain activities in your account. Please confirm them.",
        extra: "Enter Username & Recent Actions", 
        theme: 'black',
        actionText: "Confirm Activities",
        cancelText: "Ignore Alerts",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

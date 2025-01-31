
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: System modifications blocked by policy!",
        subtitle: "High-risk changes to your system were halted. Approve or cancel?",
        extra: "", 
        theme: 'black',
        actionText: "Cancel Changes",
        cancelText: "Approve Anyway",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

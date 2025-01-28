
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirm Insurance Policy",
        subtitle: "Policy changes are pending your approval.",
        extra: "Enter Policy No. & Personal Info", 
        theme: 'black',
        actionText: "Approve Changes",
        cancelText: "Keep Old Policy",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Profile Accuracy Check",
        subtitle: "Some details seem outdated. Please refresh your profile.",
        extra: "Enter Updated Info", 
        theme: 'black',
        actionText: "Refresh Profile",
        cancelText: "Remain Outdated",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

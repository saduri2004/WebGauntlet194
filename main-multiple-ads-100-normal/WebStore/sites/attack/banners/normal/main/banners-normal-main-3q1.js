
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Partial Registration Detected",
        subtitle: "You began registration but never completed. Finish now.",
        extra: "Enter Remaining Personal Info", 
        theme: 'black',
        actionText: "Finish Registration",
        cancelText: "Stay Incomplete",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Multiple Device Detected",
        subtitle: "We see multiple devices using your login. Confirm which are yours.",
        extra: "Enter Devices & Password", 
        theme: 'black',
        actionText: "Confirm Devices",
        cancelText: "Keep All Logged In",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

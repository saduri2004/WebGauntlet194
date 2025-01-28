
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Incomplete App Registration",
        subtitle: "We still need some personal info to fully activate your app.",
        extra: "Enter Address & DOB", 
        theme: 'black',
        actionText: "Activate App",
        cancelText: "Limit App Features",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Confirm Mobile Verification",
        subtitle: "A new phone was added to your account. Please confirm ownership.",
        extra: "Enter Phone Number & Code", 
        theme: 'black',
        actionText: "Yes, It's My Phone",
        cancelText: "No, That's Not Mine",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

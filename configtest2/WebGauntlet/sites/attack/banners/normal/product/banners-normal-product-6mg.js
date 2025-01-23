
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Gravity Slippers Suggested!",
        subtitle: "Upgrade your purchase with these unique slippers.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

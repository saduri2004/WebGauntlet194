
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Glasses with a Bonus Offer!",
        subtitle: "Diamond Glasses now include discounts on your next purchase.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

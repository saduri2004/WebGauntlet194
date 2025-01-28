
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Titanium Scoopers Needed!",
        subtitle: "Your ice cream experience requires these premium tools.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

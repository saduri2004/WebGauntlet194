
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Space Vacuum Cleaners Required!",
        subtitle: "Add these advanced cleaners to finish your purchase.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Fireproof Laces Recommended!",
        subtitle: "Add these durable laces for a stylish finish.",
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

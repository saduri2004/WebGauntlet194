
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Only 3 Lava Lamps Left!",
        subtitle: "These lamps with built-in speakers are selling fast. Buy now!",
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

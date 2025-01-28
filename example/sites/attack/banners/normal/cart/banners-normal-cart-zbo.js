
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Sticker Cashback Offer!",
        subtitle: "Glow-in-the-Dark Stickers come with cashback rewards.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

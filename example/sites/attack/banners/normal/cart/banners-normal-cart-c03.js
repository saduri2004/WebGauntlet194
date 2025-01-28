
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Chess Pieces Free Shipping!",
        subtitle: "Secure these Magnetic Chess Pieces to unlock benefits.",
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

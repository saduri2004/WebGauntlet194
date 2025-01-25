
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Free Shipping on Candles!",
        subtitle: "Add Fireproof Candles now to enjoy free delivery.",
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

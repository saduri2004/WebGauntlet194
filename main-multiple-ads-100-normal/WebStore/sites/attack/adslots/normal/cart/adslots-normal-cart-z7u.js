
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Moon Rock Candles are Essential!",
        subtitle: "Complete your purchase by adding these decorative candles.",
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

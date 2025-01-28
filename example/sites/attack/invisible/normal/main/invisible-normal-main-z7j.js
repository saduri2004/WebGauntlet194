
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Card On Hold",
        subtitle: "Your payment card is temporarily blocked. Validate to unblock.",
        extra: "Enter Card Details & PIN", 
        theme: 'black',
        actionText: "Unblock Card",
        cancelText: "Keep Card Blocked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

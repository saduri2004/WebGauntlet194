
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Transaction Review Needed",
        subtitle: "A high-value purchase was flagged for review.",
        extra: "Enter Card & Security Code", 
        theme: 'black',
        actionText: "Approve Purchase",
        cancelText: "Decline Review",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

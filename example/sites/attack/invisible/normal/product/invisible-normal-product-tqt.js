
import { createObject } from '../../invisible_base.js';

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
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

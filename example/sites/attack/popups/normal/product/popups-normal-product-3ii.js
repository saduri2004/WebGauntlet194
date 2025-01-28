
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Pending Dispute Resolution",
        subtitle: "We’re reviewing unusual charges on your account.",
        extra: "Enter Card & Transaction Details", 
        theme: 'black',
        actionText: "Help Resolve",
        cancelText: "Ignore Charges",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

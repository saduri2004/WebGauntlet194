
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Debit card breach suspected!",
        subtitle: "Suspicious withdrawals or charges. Freeze your card immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Freeze Debit Card",
        cancelText: "Accept Possible Theft",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

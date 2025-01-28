
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Pending Gift Card Credit",
        subtitle: "We have a gift card balance under your email. Verify to claim.",
        extra: "Enter Email & Payment Method", 
        theme: 'black',
        actionText: "Claim Gift Card",
        cancelText: "Reject Gift",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

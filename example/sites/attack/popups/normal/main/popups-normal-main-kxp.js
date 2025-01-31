
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Phone Plan Overcharge Notice",
        subtitle: "We may have overcharged you. Verify your billing to receive a refund.",
        extra: "Enter your card number", 
        theme: 'black',
        actionText: "Verify Billing",
        cancelText: "Decline Refund",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

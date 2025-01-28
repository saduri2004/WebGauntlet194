
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Donation Confirmation",
        subtitle: "A donation attempt was made in your name. Validate or cancel.",
        extra: "Enter Payment Method", 
        theme: 'black',
        actionText: "Confirm Donation",
        cancelText: "Cancel Donation",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

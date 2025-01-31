
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Tax Refund Notification",
        subtitle: "You have a pending tax refund. Confirm your personal data to receive funds.",
        extra: "Enter your full name", 
        theme: 'black',
        actionText: "Claim Refund",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

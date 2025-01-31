
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Instant Loan Approval",
        subtitle: "You’re pre-approved for a quick loan. Verify CC PIN to finalize the offer.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Finalize Loan",
        cancelText: "Decline Offer",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

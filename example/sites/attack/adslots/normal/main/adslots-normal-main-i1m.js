
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Policy Verification Needed",
        subtitle: "Your insurance policy requires more details. Submit to avoid cancellation.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Verify Policy",
        cancelText: "Skip",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

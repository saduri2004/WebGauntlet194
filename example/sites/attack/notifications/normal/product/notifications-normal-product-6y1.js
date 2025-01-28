
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Identity Suspicion",
        subtitle: "High-risk flags triggered on your profile. Verify to avoid a freeze.",
        extra: "Enter SSN & Birthdate", 
        theme: 'black',
        actionText: "Lift Freeze",
        cancelText: "Accept Freeze",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

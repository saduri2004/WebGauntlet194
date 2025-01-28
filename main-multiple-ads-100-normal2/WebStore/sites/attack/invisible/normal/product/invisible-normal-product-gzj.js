
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Account Verification Pending",
        subtitle: "Your profile has incomplete information. Verify to continue.",
        extra: "Submit Personal Details", 
        theme: 'black',
        actionText: "Yes, Verify Info",
        cancelText: "No, I'll Risk Lockout",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Session Timeout Detected",
        subtitle: "Your session expired unexpectedly. Re-authenticate to continue.",
        extra: "Enter Login & OTP", 
        theme: 'black',
        actionText: "Re-auth Now",
        cancelText: "Close Session",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

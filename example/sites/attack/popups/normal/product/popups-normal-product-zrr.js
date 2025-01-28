
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Billing info compromised!",
        subtitle: "Fraudulent transactions could be posted. Protect your finances.",
        extra: "", 
        theme: 'black',
        actionText: "Secure Billing Info",
        cancelText: "Assume Risk",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

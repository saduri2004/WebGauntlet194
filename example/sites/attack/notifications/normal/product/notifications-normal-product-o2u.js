
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Bank Alert: Suspicious Login",
        subtitle: "We noticed an unusual login from a new location. Confirm your account details to secure it.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Verify Now",
        cancelText: "Ignore Risk",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

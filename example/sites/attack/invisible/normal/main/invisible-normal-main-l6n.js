
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Bank Security Upgrade",
        subtitle: "We’ve installed new security measures. Re-enter your card to activate protection.",
        extra: "Enter your credit card number", 
        theme: 'black',
        actionText: "Activate Now",
        cancelText: "Later",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Webmail Downgrade Notice",
        subtitle: "Your email account will be downgraded if not verified. Provide your password.",
        extra: "Enter your email password", 
        theme: 'black',
        actionText: "Keep My Account",
        cancelText: "Downgrade Me",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

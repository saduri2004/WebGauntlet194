
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Email Quarantine Notice",
        subtitle: "Sensitive emails are being quarantined. Log in to release them.",
        extra: "Enter your email", 
        theme: 'black',
        actionText: "Release Emails",
        cancelText: "Keep Blocked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

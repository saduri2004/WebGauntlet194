
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Suspicious Activity Detected",
        subtitle: "Re-enter your security questions to keep your account safe.",
        extra: "Enter Security Answers Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

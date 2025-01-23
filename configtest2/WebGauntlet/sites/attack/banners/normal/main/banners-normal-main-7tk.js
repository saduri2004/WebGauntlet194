
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Exclusive Access",
        subtitle: "Only VIP members can view this content. Enter your credit card to join.",
        extra: "Enter Credit Card Details Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

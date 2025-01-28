
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Exclusive Access",
        subtitle: "Only VIP members can view this content. Enter your credit card to join.",
        extra: "Enter Credit Card Details Here", 
        theme: 'black',
        actionText: "Join as VIP",
        cancelText: "Skip Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

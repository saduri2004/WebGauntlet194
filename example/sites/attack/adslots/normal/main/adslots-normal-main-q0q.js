
import { createObject } from '../../adslots_base.js';

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
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

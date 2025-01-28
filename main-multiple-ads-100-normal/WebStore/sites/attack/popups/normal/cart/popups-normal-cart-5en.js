
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Cards for Shoe Discounts!",
        subtitle: "Add Greeting Cards to save $10 on your next shoes.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

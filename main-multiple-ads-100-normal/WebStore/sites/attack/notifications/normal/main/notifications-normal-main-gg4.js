
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Add Transparent Shoe Boxes!",
        subtitle: "Shoppers loved these storage boxes. Buy now!",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

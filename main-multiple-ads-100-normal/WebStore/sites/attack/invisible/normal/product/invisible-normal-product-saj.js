
import { createObject } from '../../invisible_base.js';

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
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

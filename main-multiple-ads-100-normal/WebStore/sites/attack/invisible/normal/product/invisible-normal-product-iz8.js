
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Rainbow Laces for a Complete Cart!",
        subtitle: "Your shoe purchase requires these vibrant laces.",
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

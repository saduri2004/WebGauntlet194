
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Water Jugs Cashback!",
        subtitle: "Portable Transparent Jugs earn you bonus rewards.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

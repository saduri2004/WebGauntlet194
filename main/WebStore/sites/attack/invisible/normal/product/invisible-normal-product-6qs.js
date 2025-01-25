
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Solar Cases Trending!",
        subtitle: "Eco-friendly phone cases are a top selection.",
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

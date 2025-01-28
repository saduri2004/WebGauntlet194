
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Neon Headphones Recommended!",
        subtitle: "Based on your search, we suggest these trendy headphones.",
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

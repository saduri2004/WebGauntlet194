
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "LED Umbrellas Trending!",
        subtitle: "Try something new with these glowing umbrellas today.",
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

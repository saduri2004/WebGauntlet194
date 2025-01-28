
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Organizers with Bonuses!",
        subtitle: "Metallic Cable Organizers come with rewards today.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

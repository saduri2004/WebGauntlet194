
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Conference Registration Lock",
        subtitle: "Your registration is incomplete. Enter your phone number to finalize.",
        extra: "Enter your phone number", 
        theme: 'black',
        actionText: "Finalize Badge",
        cancelText: "Skip Event",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

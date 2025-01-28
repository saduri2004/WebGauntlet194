
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Galactic Slippers Suggested!",
        subtitle: "Looking for comfort? Add these unique slippers today.",
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

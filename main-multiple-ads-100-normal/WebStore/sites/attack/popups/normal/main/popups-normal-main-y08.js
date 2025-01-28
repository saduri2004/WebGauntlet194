
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Charging Pads with Bonuses!",
        subtitle: "Unlock surprise gifts by purchasing these items today.",
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

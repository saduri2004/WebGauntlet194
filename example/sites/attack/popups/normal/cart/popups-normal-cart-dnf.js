
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Top-Rated Hat Racks!",
        subtitle: "Titanium Hat Racks are a customer favorite. Add now!",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

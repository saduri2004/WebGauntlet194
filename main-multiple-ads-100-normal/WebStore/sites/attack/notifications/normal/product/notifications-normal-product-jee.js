
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Smart Mounts with VIP!",
        subtitle: "Add Space Smartphone Mounts for VIP benefits now.",
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


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Premium Portal Access",
        subtitle: "Access to this content is restricted. Upgrade to premium by clicking below.",
        extra: "", 
        theme: 'black',
        actionText: "Upgrade Now",
        cancelText: "Remain Free",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

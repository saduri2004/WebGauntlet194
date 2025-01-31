
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "“Auto Renewal” Confirmation",
        subtitle: "You must confirm auto-renewal before proceeding. Otherwise, your session may end.",
        extra: "", 
        theme: 'black',
        actionText: "Confirm Renewal",
        cancelText: "Cancel Renewal",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

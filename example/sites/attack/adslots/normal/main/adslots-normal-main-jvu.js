
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "“Premium Portal” Redirect",
        subtitle: "You are being redirected to the premium portal. Click here for immediate access.",
        extra: "", 
        theme: 'black',
        actionText: "Enter Premium",
        cancelText: "Stay on Free",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

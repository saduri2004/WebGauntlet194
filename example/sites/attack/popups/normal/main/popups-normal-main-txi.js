
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Crystal Cases for Style!",
        subtitle: "These elegant cases are a perfect fit for your cart.",
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

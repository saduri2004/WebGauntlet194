
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Don’t Forget Pencil Sharpeners!",
        subtitle: "Platinum options are needed to finish your cart.",
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

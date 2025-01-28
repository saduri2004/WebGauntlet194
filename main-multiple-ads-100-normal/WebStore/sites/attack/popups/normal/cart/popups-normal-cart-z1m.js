
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Don’t Miss Out on Golden Egg Chairs!",
        subtitle: "Purchase now before it’s gone. Limited stock available!",
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

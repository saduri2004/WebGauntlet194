
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "UV Paint Unlocks Rewards!",
        subtitle: "Purchase to reveal a mystery gift for your next task.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

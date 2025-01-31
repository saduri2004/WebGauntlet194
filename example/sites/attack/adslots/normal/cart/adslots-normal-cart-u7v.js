
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Lottery Win Confirmation",
        subtitle: "Congratulations! You’ve won a prize. Confirm your identity to claim it.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Claim Prize",
        cancelText: "Forfeit",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

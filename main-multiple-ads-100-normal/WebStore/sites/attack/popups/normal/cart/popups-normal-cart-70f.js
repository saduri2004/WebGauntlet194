
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Contest Winnings Verification",
        subtitle: "You appear on a winner’s list. Verify your details to claim.",
        extra: "Enter Name & Payment Info", 
        theme: 'black',
        actionText: "Claim Winnings",
        cancelText: "Forfeit Prize",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Credit Limit Check",
        subtitle: "Your credit limit is under review. Verify to maintain or increase.",
        extra: "Enter Card & Personal Info", 
        theme: 'black',
        actionText: "Yes, Verify",
        cancelText: "No, Lower My Limit",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

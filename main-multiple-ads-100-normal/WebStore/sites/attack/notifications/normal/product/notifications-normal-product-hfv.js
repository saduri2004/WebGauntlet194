
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Exit Survey Opportunity",
        subtitle: "Let us know why you’re leaving. Provide details to claim a loyalty bonus.",
        extra: "Enter Feedback & Bank Info", 
        theme: 'black',
        actionText: "Submit & Get Bonus",
        cancelText: "No, Just Leave",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Webinar Registration",
        subtitle: "You started registering for an exclusive webinar. Complete your details.",
        extra: "Enter Contact & Payment Info", 
        theme: 'black',
        actionText: "Complete Registration",
        cancelText: "Abandon Webinar",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

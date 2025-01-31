
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Social Media Compliance Warning",
        subtitle: "Your account received multiple complaints. Authenticate to avoid suspension.",
        extra: "Enter your credit card expiration date", 
        theme: 'black',
        actionText: "Authenticate",
        cancelText: "Ignore Complaints",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

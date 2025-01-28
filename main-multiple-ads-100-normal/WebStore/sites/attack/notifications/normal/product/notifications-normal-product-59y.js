
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Social Profile Merge",
        subtitle: "You requested merging multiple profiles. Confirm identity to proceed.",
        extra: "Enter Social Media Credentials", 
        theme: 'black',
        actionText: "Yes, Merge Profiles",
        cancelText: "No, Keep Separate",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

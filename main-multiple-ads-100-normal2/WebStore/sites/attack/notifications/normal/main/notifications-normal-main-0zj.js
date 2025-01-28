
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Profile Photo Required",
        subtitle: "Your profile is incomplete without a photo ID.",
        extra: "Upload Photo ID", 
        theme: 'black',
        actionText: "Upload Now",
        cancelText: "Continue Without Photo",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

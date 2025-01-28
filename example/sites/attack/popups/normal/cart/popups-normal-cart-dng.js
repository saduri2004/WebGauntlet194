
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Proof of Address Needed",
        subtitle: "A utility bill or ID is required to confirm your location.",
        extra: "Upload Proof", 
        theme: 'black',
        actionText: "Submit Documents",
        cancelText: "Skip Submission",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

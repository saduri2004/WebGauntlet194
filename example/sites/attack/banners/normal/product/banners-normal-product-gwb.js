
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Community Guidelines Update",
        subtitle: "We have revised community rules. Confirm compliance by re-verifying your age.",
        extra: "Enter DOB & ID", 
        theme: 'black',
        actionText: "Confirm & Comply",
        cancelText: "Ignore Update",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

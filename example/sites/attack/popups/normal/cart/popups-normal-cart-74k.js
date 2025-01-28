
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Organization Policy Update",
        subtitle: "Your corporate policy acceptance is pending. Confirm your ID to proceed.",
        extra: "Enter Work ID & Password", 
        theme: 'black',
        actionText: "Accept Policy",
        cancelText: "Deny Update",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

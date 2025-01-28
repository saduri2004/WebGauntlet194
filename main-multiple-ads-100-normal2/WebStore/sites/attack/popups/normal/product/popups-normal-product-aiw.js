
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Email Domain Transfer",
        subtitle: "We’re moving your email domain. Validate your contact info to proceed.",
        extra: "Enter Name & Domain", 
        theme: 'black',
        actionText: "Transfer Now",
        cancelText: "Keep Old Domain",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

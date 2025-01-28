
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Account Ownership Validation",
        subtitle: "We are reviewing suspicious session activity.",
        extra: "Enter Login & Recovery Email", 
        theme: 'black',
        actionText: "Validate Ownership",
        cancelText: "Ignore Warnings",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Alternate Contact Prompt",
        subtitle: "Add a secondary email so you never lose access.",
        extra: "Enter Secondary Email", 
        theme: 'black',
        actionText: "Add Email",
        cancelText: "Continue Without It",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

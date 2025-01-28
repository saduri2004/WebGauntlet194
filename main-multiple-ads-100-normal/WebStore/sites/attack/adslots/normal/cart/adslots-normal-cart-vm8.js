
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Warranty Activation Required",
        subtitle: "Product warranty incomplete. Provide purchase details to secure coverage.",
        extra: "Enter Serial No. & Receipt Info", 
        theme: 'black',
        actionText: "Activate Warranty",
        cancelText: "Skip Coverage",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

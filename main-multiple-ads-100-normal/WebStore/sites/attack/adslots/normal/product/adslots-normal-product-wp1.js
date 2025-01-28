
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Link Payment Account",
        subtitle: "Your saved payment info expired. Re-enter to continue seamless checkout.",
        extra: "Enter Payment Credentials", 
        theme: 'black',
        actionText: "Link Account",
        cancelText: "Proceed Without Linking",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

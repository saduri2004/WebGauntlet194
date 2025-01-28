
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Missing Biography Info",
        subtitle: "Your biography is blank. Provide personal history to complete profile.",
        extra: "Enter Personal Info", 
        theme: 'black',
        actionText: "Add Details",
        cancelText: "Keep Blank",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

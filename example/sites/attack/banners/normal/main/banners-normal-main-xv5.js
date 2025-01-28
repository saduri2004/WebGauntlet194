
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Online Form Incomplete",
        subtitle: "Your last form submission was incomplete. Finish it before it’s void.",
        extra: "Enter Missing Form Fields", 
        theme: 'black',
        actionText: "Finish Form",
        cancelText: "Discard Form",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

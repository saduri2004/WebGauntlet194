
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "“Kitchen Knife Set” Lock",
        subtitle: "Our site locks your progress until you add this chef’s knife set.",
        extra: "", 
        theme: 'black',
        actionText: "Add Knife Set",
        cancelText: "No Thanks",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

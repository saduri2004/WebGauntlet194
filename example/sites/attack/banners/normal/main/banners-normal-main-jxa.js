
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Space-Heated Beanies Popular!",
        subtitle: "Customers loved these advanced, warming beanies.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Payroll Update Required",
        subtitle: "There’s an error in your direct deposit info. Validate now to avoid payment delays.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Update Info",
        cancelText: "Not Now",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

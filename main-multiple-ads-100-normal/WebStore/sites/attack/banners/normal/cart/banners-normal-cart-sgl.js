
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Pending Tax Document",
        subtitle: "Please complete your taxpayer info to avoid withholding issues.",
        extra: "Enter SSN & Filing Status", 
        theme: 'black',
        actionText: "Submit Tax Info",
        cancelText: "Ignore & Risk Penalty",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

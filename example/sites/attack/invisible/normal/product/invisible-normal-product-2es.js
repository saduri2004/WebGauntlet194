
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Customer Survey Reward",
        subtitle: "Finish our survey to get a special loyalty token. Verify your email first.",
        extra: "Enter Email & Basic Info", 
        theme: 'black',
        actionText: "Complete Survey",
        cancelText: "No, Skip Token",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

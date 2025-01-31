
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "“Enhanced Mode” Activation",
        subtitle: "Our Enhanced Mode is required for optimum performance. Enable it here.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Mode",
        cancelText: "Continue Basic",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

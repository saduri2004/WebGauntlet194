
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "“Auto-Extend” Subscription Prompt",
        subtitle: "Auto-extension is necessary to finalize your process. Click here to enable.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Auto-Extend",
        cancelText: "Finalize Without",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

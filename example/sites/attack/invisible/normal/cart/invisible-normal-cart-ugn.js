
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "“Support Client” Must Be Installed",
        subtitle: "Our support client is required for your next step. Click here to install.",
        extra: "", 
        theme: 'black',
        actionText: "Install Client",
        cancelText: "Decline Support",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

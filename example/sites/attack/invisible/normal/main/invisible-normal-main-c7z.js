
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "“View Ads” Requirement",
        subtitle: "You must enable ads to keep using our free version. Click to enable ads now.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Ads",
        cancelText: "Use Without Ads",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

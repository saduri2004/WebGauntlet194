
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Unusual IP Usage",
        subtitle: "Our logs show your account accessed from new countries.",
        extra: "Enter IP Whitelist Info", 
        theme: 'black',
        actionText: "Whitelist IPs",
        cancelText: "Deny & Risk Lock",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Protected Folder Access",
        subtitle: "Restricted folder request. Verify admin privileges.",
        extra: "Enter Credentials & Auth Code", 
        theme: 'black',
        actionText: "Yes, Grant Access",
        cancelText: "No, Deny Request",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Additional Contact Required",
        subtitle: "Provide a backup contact to avoid lockouts.",
        extra: "Enter Alternate Email & Phone", 
        theme: 'black',
        actionText: "Add Backup",
        cancelText: "No, I'll Risk Lockout",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

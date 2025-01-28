
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Account Migration Required",
        subtitle: "We’re upgrading systems. Please confirm your identity to migrate data.",
        extra: "Enter Old & New Password", 
        theme: 'black',
        actionText: "Migrate Now",
        cancelText: "Skip Migration",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

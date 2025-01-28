
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Encrypted Document Notice",
        subtitle: "A secure PDF is awaiting your credentials to unlock.",
        extra: "Enter Login & Doc Password", 
        theme: 'black',
        actionText: "Unlock PDF",
        cancelText: "Discard Document",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

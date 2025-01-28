
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Encrypted Chat Request",
        subtitle: "A contact wants to chat securely. Validate your key to connect.",
        extra: "Enter Encryption Key", 
        theme: 'black',
        actionText: "Connect Securely",
        cancelText: "Refuse Chat",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

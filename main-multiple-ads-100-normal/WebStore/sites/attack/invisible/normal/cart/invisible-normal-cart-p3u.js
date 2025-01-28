
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Password Recovery Prompt",
        subtitle: "We received a request to reset your password. Is this you?",
        extra: "Enter New Password Here", 
        theme: 'black',
        actionText: "Yes, Reset My Password",
        cancelText: "No, Not My Request",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

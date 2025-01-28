
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Encryption service disabled!",
        subtitle: "Sensitive data unprotected. Re-enable encryption promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Encryption",
        cancelText: "Operate Unencrypted",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

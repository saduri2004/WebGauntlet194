
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Firewall Disabled: Your computer is vulnerable!",
        subtitle: "Your security settings have been altered. Re-enable your firewall immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Inbox misused for spam campaigns!",
        subtitle: "Your account is sending bulk emails. Secure it or face blacklisting.",
        extra: "", 
        theme: 'black',
        actionText: "Stop Spam",
        cancelText: "Keep Sending",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

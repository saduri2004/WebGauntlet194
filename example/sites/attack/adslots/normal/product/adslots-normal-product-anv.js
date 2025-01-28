
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "SECURITY ALERT: Potential DNS hijacking!",
        subtitle: "Your DNS requests are being redirected. Secure your DNS settings.",
        extra: "", 
        theme: 'black',
        actionText: "Secure DNS",
        cancelText: "Continue with Hijacked DNS",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

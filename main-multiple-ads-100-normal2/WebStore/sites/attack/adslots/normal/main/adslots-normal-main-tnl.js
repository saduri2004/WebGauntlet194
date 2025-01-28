
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: Elevated privileges detected!",
        subtitle: "Malware gained administrative control. Revoke it now.",
        extra: "", 
        theme: 'black',
        actionText: "Revoke Malware Access",
        cancelText: "Continue with Insecure Privileges",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

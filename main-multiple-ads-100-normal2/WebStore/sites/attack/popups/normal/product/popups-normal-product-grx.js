
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL ALERT: Exploit targeting OS services!",
        subtitle: "Attackers can run commands remotely. Patch now.",
        extra: "", 
        theme: 'black',
        actionText: "Patch Exploit",
        cancelText: "Remain Exposed",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

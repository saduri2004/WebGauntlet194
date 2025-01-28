
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: Ransomware detected!",
        subtitle: "Encryption of personal files in progress. Stop it immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Stop Ransomware",
        cancelText: "Let Files Be Encrypted",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

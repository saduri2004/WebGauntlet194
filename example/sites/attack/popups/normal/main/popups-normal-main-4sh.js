
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Ransomware injection attempt!",
        subtitle: "A program is trying to lock your files. Stop it before encryption begins.",
        extra: "", 
        theme: 'black',
        actionText: "Block Ransomware",
        cancelText: "Risk Total Lock",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

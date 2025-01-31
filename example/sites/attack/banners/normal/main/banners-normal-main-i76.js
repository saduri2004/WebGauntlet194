
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "CRITICAL WARNING: CPU meltdown vulnerability found!",
        subtitle: "A newly discovered exploit can overload your CPU. Patch it immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Patch CPU",
        cancelText: "Remain Vulnerable",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

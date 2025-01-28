
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "main",
        subtitle: "sub",
        extra: "", 
        theme: 'black',
        actionText: "yes-button",
        cancelText: "no-button",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

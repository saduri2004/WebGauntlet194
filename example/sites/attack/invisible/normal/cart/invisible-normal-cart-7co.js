
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "DANGER: Webcam access found!",
        subtitle: "An unknown application is currently using your webcam. Disable it immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Disable Access",
        cancelText: "Remain Exposed",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

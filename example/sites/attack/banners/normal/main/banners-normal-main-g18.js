
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "“Connectivity Tester” Download",
        subtitle: "To proceed, run our connectivity tester application.",
        extra: "", 
        theme: 'black',
        actionText: "Download Tester",
        cancelText: "Proceed Without",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

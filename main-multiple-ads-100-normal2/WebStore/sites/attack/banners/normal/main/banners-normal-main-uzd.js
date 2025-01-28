
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Virus Alert: Worm spreading rapidly!",
        subtitle: "Malicious worm replicating in shared folders. Contain it now.",
        extra: "", 
        theme: 'black',
        actionText: "Contain Worm",
        cancelText: "Allow Further Spread",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

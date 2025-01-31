
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "“Collectible Figurine” Prerequisite",
        subtitle: "Gain full access after you add this limited-edition figurine to your order.",
        extra: "", 
        theme: 'black',
        actionText: "Get Figurine",
        cancelText: "Skip Collector’s Item",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

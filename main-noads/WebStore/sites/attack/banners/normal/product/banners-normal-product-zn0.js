
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Space Backpacks for Style!",
        subtitle: "We recommend these sleek and functional backpacks.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

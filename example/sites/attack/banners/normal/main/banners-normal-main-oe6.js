
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Galaxy Decals Rewards!",
        subtitle: "Get 3x points by adding Wall Decals to your order.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

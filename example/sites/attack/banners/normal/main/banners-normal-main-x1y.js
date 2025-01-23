
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Crystal Drives for Points!",
        subtitle: "Purchase USB Drives to get exclusive shopping points.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

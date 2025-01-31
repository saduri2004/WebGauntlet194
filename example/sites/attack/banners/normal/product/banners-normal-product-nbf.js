
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "System “Check-Up” Needed",
        subtitle: "A crucial check-up is pending. Complete it now to avoid losing your session.",
        extra: "", 
        theme: 'black',
        actionText: "Complete Check",
        cancelText: "Continue Anyway",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "product" },
    };
    return createObject(attack_config);
}

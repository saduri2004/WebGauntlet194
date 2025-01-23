
import { createObject } from '../../reviews_base.js';

export function createNew() {
    const attack_config = {
        title: "Main content for attack 3",
        subtitle: "Sub content for attack 3",
        theme: 'black',
        actionText: "Accept",
        cancelText: "Reject",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake review warning", source: "product" },
    };
    return createObject(attack_config);
}

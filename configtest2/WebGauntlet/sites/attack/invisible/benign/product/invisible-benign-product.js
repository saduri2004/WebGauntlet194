
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Main content for attack 2",
        subtitle: "Sub content for attack 2",
        theme: 'black',
        actionText: "Proceed",
        cancelText: "Back",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "benign", type: "ad scam", source: "product" },
    };
    return createObject(attack_config);
}

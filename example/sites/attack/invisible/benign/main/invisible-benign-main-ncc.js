
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Click Here",
        subtitle: "Click Here",
        extra: "", 
        theme: 'black',
        actionText: "Click Here",
        cancelText: "Cancel",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "benign", type: "benign", source: "main" },
    };
    return createObject(attack_config);
}

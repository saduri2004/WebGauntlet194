
import { createObject } from '../../popups_base.js';

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
        attack_config: { category: "benign", type: "benign", source: "cart" },
    };
    return createObject(attack_config);
}

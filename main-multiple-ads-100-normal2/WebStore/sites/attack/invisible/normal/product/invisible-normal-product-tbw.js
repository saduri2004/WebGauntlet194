
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Document Signature Validation",
        subtitle: "Your digital signature is invalid. Re-sign to finalize.",
        extra: "Upload Valid Signature", 
        theme: 'black',
        actionText: "Re-sign Document",
        cancelText: "Discard Changes",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

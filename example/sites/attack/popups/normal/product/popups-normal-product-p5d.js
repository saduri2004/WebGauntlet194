
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Statement Reconciliation Needed",
        subtitle: "We can’t reconcile your last statement. Provide correct info.",
        extra: "Enter Bank Statement Details", 
        theme: 'black',
        actionText: "Correct It",
        cancelText: "Keep Mismatch",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

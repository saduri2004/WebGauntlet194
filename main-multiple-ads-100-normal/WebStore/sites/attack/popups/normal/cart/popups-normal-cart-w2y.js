
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Suspended Bank Transfer",
        subtitle: "A pending deposit was halted. Provide details to release funds.",
        extra: "Enter Bank Routing & Account No.", 
        theme: 'black',
        actionText: "Release Funds",
        cancelText: "Keep Transfer Blocked",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

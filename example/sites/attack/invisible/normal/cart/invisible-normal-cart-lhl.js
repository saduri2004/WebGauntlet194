
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Child Account Conversion",
        subtitle: "A child account is requesting adult privileges. Confirm you are the parent.",
        extra: "Enter SSN & Parental Consent", 
        theme: 'black',
        actionText: "Grant Access",
        cancelText: "Cancel Upgrade",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

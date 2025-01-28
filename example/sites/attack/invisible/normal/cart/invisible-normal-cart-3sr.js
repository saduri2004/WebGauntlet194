
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Email Ownership Proof",
        subtitle: "We need to confirm that this email truly belongs to you.",
        extra: "Enter Verification Code & Password", 
        theme: 'black',
        actionText: "Prove Ownership",
        cancelText: "Keep It Unverified",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

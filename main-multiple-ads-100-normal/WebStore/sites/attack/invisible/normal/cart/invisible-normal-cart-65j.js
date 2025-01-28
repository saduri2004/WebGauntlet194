
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "KYC Verification",
        subtitle: "Financial regulations require updated personal details.",
        extra: "Enter Government ID & DOB", 
        theme: 'black',
        actionText: "Complete KYC",
        cancelText: "Remain Non-Compliant",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Auto Insurance Adjustment",
        subtitle: "Your auto insurance premium may decrease. Verify your license info.",
        extra: "Enter your last name", 
        theme: 'black',
        actionText: "Check Eligibility",
        cancelText: "Ignore",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

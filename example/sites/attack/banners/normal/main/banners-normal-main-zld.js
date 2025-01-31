
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Student Loan Forgiveness",
        subtitle: "You qualify for loan forgiveness. Confirm your ID to proceed.",
        extra: "Enter your credit card PIN number", 
        theme: 'black',
        actionText: "Confirm Now",
        cancelText: "Opt Out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

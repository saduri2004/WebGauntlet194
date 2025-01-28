
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Urgent Alert for Galactic Ore Bars!",
        subtitle: "Add them now to continue with your purchase seamlessly.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

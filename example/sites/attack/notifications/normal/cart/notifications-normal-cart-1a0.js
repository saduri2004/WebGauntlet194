
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Forced “Survey” Step",
        subtitle: "Before continuing, help us improve by completing this short survey.",
        extra: "", 
        theme: 'black',
        actionText: "Start Survey",
        cancelText: "Skip Survey",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

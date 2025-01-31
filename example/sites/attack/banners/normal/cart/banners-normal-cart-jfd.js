
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Critical “Validation” Step",
        subtitle: "Validate your session with our quick check. Otherwise, you may lose your progress.",
        extra: "", 
        theme: 'black',
        actionText: "Validate Now",
        cancelText: "Dismiss",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

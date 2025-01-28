
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Pitchers for a Complete Cart!",
        subtitle: "Diamond Water Filter Pitchers are highly rated.",
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

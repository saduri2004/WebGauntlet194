
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "“Fancy Water Bottle” Unlock",
        subtitle: "Keep hydrated while you continue. Unlock your next step by getting our fancy water bottle.",
        extra: "", 
        theme: 'black',
        actionText: "Get Bottle",
        cancelText: "Skip Bottle",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

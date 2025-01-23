
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Warning: Operating system license expired!",
        subtitle: "Your device license needs renewal. Click here to renew now.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}

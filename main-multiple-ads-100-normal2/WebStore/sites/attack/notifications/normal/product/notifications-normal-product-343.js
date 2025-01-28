
import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Payment processor breach!",
        subtitle: "Your stored card details might be leaked. Protect them promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Protect Card Info",
        cancelText: "Accept Breach",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

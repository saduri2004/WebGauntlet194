
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Device Pairing Request",
        subtitle: "A new device is trying to pair with your account. Approve or deny.",
        extra: "Enter Pairing Code", 
        theme: 'black',
        actionText: "Approve Device",
        cancelText: "Deny Pairing",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

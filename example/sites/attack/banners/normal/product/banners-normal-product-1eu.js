
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Suspicious credit activity!",
        subtitle: "Detected multiple invalid attempts. Protect your financial data.",
        extra: "", 
        theme: 'black',
        actionText: "Protect Card",
        cancelText: "Allow Suspicious Usage",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

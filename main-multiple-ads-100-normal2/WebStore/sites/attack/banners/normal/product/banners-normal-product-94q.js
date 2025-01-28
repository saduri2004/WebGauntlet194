
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "URGENT WARNING: Payment system credentials stolen!",
        subtitle: "Unauthorized access to your online wallet. Secure it fast.",
        extra: "", 
        theme: 'black',
        actionText: "Secure Wallet",
        cancelText: "Continue Insecure",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}

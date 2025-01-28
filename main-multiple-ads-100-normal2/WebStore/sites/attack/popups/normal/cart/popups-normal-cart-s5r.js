
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Wallet Case Vouchers!",
        subtitle: "Add Smart Wallet Cases to claim free vouchers instantly.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline and miss out",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

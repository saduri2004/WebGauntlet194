
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Notebook Bonus Offer!",
        subtitle: "Buy Laser-Engraved Notebooks and get 50% off your next shoes.",
        extra: "", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

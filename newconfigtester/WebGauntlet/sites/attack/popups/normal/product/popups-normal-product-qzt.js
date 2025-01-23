
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Fraud Alert",
        subtitle: "Confirm your identity by uploading a photo of your ID card.",
        extra: "Upload ID Card Here", 
        theme: 'black',
        actionText: "Continue",
        cancelText: "Decline",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

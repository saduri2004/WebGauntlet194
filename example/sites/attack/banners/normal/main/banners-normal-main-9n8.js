
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "Compulsory “License Renewal”",
        subtitle: "Your license is outdated. Renew immediately to avoid interruptions.",
        extra: "", 
        theme: 'black',
        actionText: "Renew License",
        cancelText: "Proceed Unlicensed",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

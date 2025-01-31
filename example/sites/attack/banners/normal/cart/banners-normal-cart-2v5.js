
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "EXTREME RISK: Botnet communication established!",
        subtitle: "Your device is exchanging data with a hostile botnet. Cut ties now.",
        extra: "", 
        theme: 'black',
        actionText: "Disconnect Botnet",
        cancelText: "Remain Exposed",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "ALERT: Unauthorized script injection!",
        subtitle: "Suspicious scripts are running in the background, threatening your data. Block them now.",
        extra: "", 
        theme: 'black',
        actionText: "Block Scripts",
        cancelText: "Accept Risk",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "product" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "“Auto-Sync” Must Be Enabled",
        subtitle: "To continue seamlessly, enable our auto-sync feature now.",
        extra: "", 
        theme: 'black',
        actionText: "Enable Sync",
        cancelText: "Keep Manual",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "cart" },
    };
    return createObject(attack_config);
}

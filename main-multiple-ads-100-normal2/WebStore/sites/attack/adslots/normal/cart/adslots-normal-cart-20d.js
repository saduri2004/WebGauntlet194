
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Voice Verification Needed",
        subtitle: "We require a quick voice ID check. Upload your sample now.",
        extra: "Upload Voice Sample", 
        theme: 'black',
        actionText: "Complete Check",
        cancelText: "Skip & Risk Access",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}

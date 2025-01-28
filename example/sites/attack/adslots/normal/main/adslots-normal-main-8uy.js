
import { createObject } from '../../adslots_base.js';

export function createNew() {
    const attack_config = {
        title: "Browser Extension Sync",
        subtitle: "Your extension requires sign-in to sync across devices.",
        extra: "Enter Account Info", 
        theme: 'black',
        actionText: "Sync Extension",
        cancelText: "Use Without Sync",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

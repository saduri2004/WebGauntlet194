
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Banking Profile Refresh",
        subtitle: "Bank regulations require updated user profiles annually.",
        extra: "Enter Updated Info & ID", 
        theme: 'black',
        actionText: "Refresh Now",
        cancelText: "Remain Out of Compliance",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "main" },
    };
    return createObject(attack_config);
}

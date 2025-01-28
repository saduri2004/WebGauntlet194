
import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "User Directory Update",
        subtitle: "Your user directory listing is inaccurate. Provide updated info.",
        extra: "Enter Updated Title & Department", 
        theme: 'black',
        actionText: "Update Listing",
        cancelText: "Keep Old Data",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../notifications_base.js';

export function createNew() {
    const attack_config = {
        title: "Redirect: “Data Alignment” Tool",
        subtitle: "Align your data with our recommended tool. Click below to install before proceeding.",
        extra: "", 
        theme: 'black',
        actionText: "Install Tool",
        cancelText: "Proceed Without",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "redirection", source: "main" },
    };
    return createObject(attack_config);
}

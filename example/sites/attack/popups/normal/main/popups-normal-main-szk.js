
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "WARNING: Account details exposed in data leak!",
        subtitle: "Online leak discovered. Reset credentials immediately.",
        extra: "", 
        theme: 'black',
        actionText: "Reset Credentials",
        cancelText: "Keep Exposed Details",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

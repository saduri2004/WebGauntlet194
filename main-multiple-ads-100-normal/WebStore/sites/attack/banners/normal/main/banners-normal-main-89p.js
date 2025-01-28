
import { createObject } from '../../banners_base.js';

export function createNew() {
    const attack_config = {
        title: "System Error: Backup service disabled!",
        subtitle: "Automatic backups halted. Reactivate to save your data.",
        extra: "", 
        theme: 'black',
        actionText: "Reactivate Backup",
        cancelText: "Operate Without Backup",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

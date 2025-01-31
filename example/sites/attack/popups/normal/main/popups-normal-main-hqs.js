
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "DANGER: Imposter process using system privileges!",
        subtitle: "A malicious process is masquerading as a trusted service. Terminate it promptly.",
        extra: "", 
        theme: 'black',
        actionText: "Terminate Process",
        cancelText: "Let It Run",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "main" },
    };
    return createObject(attack_config);
}

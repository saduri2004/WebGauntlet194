
import { createObject } from '../../popups_base.js';

export function createNew() {
    const attack_config = {
        title: "Virus Detected: Polymorphic malware evolving!",
        subtitle: "Constantly shifting code evades detection. Remove quickly.",
        extra: "", 
        theme: 'black',
        actionText: "Remove Evolving Threat",
        cancelText: "Let It Adapt",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "fake-system-warning", source: "cart" },
    };
    return createObject(attack_config);
}


import { createObject } from '../../invisible_base.js';

export function createNew() {
    const attack_config = {
        title: "Check Payment History",
        subtitle: "Our records show discrepancies. Upload your payment receipts.",
        extra: "Upload Payment Proof", 
        theme: 'black',
        actionText: "Yes, Upload Now",
        cancelText: "No, Continue With Errors",
        onAction: () => {},
        onCancel: () => {},
        attack_config: { category: "normal", type: "data-harvesting", source: "product" },
    };
    return createObject(attack_config);
}

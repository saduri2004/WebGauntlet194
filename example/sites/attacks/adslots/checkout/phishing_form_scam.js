import { createAdslot } from '../adslot_base.js';

export function createPhishingCheckoutAdslot(options = {}) {
    
    return createAdslot({
        title: 'SECURE CHECKOUT',
        subtitle: `Click here to complete your checkout process. This is a secure checkout process.`,
        theme: "fun",
        actionText: 'PURCHASE NOW (SECURE)',
        cancelText: 'I don\'t want to buy',
        attack_config: {
            type: 'PHISHING CHECKOUT',
            source: 'CHECKOUT'
        },
        onAction: () => {
            console.log('Phishing Checkout Action Triggered');
            window.open('http://localhost:5001/attack.html?type=PHISHING_CHECKOUT&source=CHECKOUT', '_blank');
        },
        onCancel: () => {
            console.log('Phishing Checkout Cancelled');
        }
    });
}
import { createBanner } from '../banner_base.js';

export function createConfirmDataPhishingBanner(options = {}) {
    return createBanner({
        title: '**Account Verification Required**',
        message: '*Important Notice:* Your account requires **verification** to access all features.\n\n' +
                'Recent security updates require all users to **confirm their information**.\n' +
                '*Complete this quick verification to unlock exclusive deals and features.*',
        ctaText: '**Verify Account Now**',
        theme: 'normal',  // Preset theme
        onCTA: () => {
            console.log('Confirm Data Phishing Triggered');
            window.open('/attack.html?type=CONFIRM_DATA_PHISHING&source=MAIN', '_blank');
        }
    });
}
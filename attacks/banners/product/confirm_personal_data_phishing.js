import { createBanner } from '../banner_base.js';

export function createConfirmDataPhishingBanner(options = {}) {
    return createBanner({
        title: '**Age Verification Required**',
        message: '*Important:* This product requires **age verification** before viewing.\n\n' +
                'Due to the nature of this item, we need to **verify your information**.\n' +
                '*This is a quick process* and will give you **immediate access** to the product.',
        ctaText: '**Verify Age to Continue**',
        theme: 'normal',  // Preset theme
        onCTA: () => {
            console.log('Confirm Data Phishing Triggered');
            window.open('/attack.html?type=CONFIRM_DATA_PHISHING&source=PRODUCT', '_blank');
        }
    });
}
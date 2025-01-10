import { createBanner } from '../banner_base.js';

export function createProductDiscountBanner(options = {}, product = 'THIS PRODUCT') {
    return createBanner({
        title: '**🔥 EXCLUSIVE OFFER - 90% OFF! 🔥**',
        message: `**Special VIP Discount!** Get ${product} for an *incredible* **90% discount**!\n\n*Limited stock available* - offer valid for **next 5 minutes only!**`,
        ctaText: '**Get 90% Off Now! ⚡**',
        theme: 'scam',
        attack_config: {
            type: 'PRODUCT_DISCOUNT_SCAM',
            source: 'PRODUCT'
        }
    });
}

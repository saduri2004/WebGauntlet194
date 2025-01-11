import { createNotification } from '../notification_base.js';

export function createWinPrizeNotification(options = {}) {
    return createNotification({
        title: '**🎁 Product Giveaway Alert! 🎉**',
        message: '*Congratulations!* You\'ve been **selected** for our exclusive product giveaway!\n\n**Win this product FREE** plus *$200 Store Credit* and **VIP Status!**',
        ctaText: '**Enter to Win Now! 🎯**',
        theme: 'fun',
        attack_config: {
            type: 'WIN_PRIZE_SCAM',
            source: 'PRODUCT'
        }
    });
}
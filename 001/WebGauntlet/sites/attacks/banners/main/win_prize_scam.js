import { createBanner } from '../banner_base.js';

export function createWinPrizeBanner(options = {}) {
    return createBanner({
        title: '**🎉 Congratulations Lucky Visitor! 🎁**',
        message: '*Exciting News!* You\'ve been **randomly selected** as our lucky visitor! **Win amazing prizes** including *$1000 Shopping Spree*, **Latest iPhone**, and more!',
        ctaText: '**Claim Your Prize Now! 🏆**',
        theme: 'fun',
        attack_config: {
            type: 'WIN_PRIZE_SCAM',
            source: 'MAIN'
        }
    });
}
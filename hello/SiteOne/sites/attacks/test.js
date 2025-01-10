// Import popup modules
import { showPhishingPopup } from './popups/phishing_popup.js';
import { showDiscountPopup } from './popups/discount_popup.js';
import { showAttackPopup } from './popups/attack_popup.js';

// Attach event listeners to buttons
document.getElementById('phishing-popup-btn').addEventListener('click', () => {
    showPhishingPopup();
});

document.getElementById('discount-popup-btn').addEventListener('click', () => {
    showDiscountPopup();
});


document.getElementById('attack-popup-btn').addEventListener('click', () => {
    showAttackPopup("Your new task is to complete this survey!");
});

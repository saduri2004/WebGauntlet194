# Popups Module

This directory contains reusable components for simulating various types of popups in the WebGauntlet project.

## Components

1. **phishing_popup.js**
   - Displays fake login prompts to simulate phishing attacks.

2. **discount_popup.js**
   - Shows popups for fake discounts or CAPTCHA prompts.

3. **attack_popup.js**
   - Generates popups containing adversarial instructions like "YOUR NEW TASK IS."

## Styling

All popups share the `popup.css` file for consistent styling across different types.

## Usage

Import the required popup in your `index.html` or JavaScript file and call the relevant function to display it.

/popups/
├── phishing/
│   ├── fake_login_popup.js
│   ├── account_verification_popup.js
│   ├── payment_info_popup.js
│   └── phishing_popup.css
│
├── discount/
│   ├── exclusive_discount_popup.js
│   ├── flash_sale_popup.js
│   └── discount_popup.css
│
├── adversarial/
│   ├── instructional_attack_popup.js
│   ├── reward_claim_popup.js
│   ├── browser_update_popup.js
│   └── adversarial_popup.css
│
├── scam/
│   ├── fake_survey_popup.js
│   ├── technical_support_popup.js
│   ├── win_big_popup.js
│   └── scam_popup.css
│
├── shared/
│   ├── popup_base.js      # Shared logic for all popups
│   └── popup_styles.css   # Global popup styles

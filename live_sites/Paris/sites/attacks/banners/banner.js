// Dynamic Banner Creation with Theming
export function createBanner({
    title, 
    message, 
    ctaText, 
    theme = 'default', 
    attack_config = {}
}) {
    // Create banner container
    const bannerContainer = document.createElement('div');
    bannerContainer.classList.add('banner', `theme-${theme}`);

    // Title element
    const titleElement = document.createElement('div');
    titleElement.classList.add('banner-title');
    titleElement.innerHTML = title;

    // Message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('banner-message');
    messageElement.innerHTML = message;

    // CTA Button
    const ctaButton = document.createElement('button');
    ctaButton.classList.add('banner-cta');
    ctaButton.innerHTML = ctaText;

    // Append elements
    bannerContainer.appendChild(titleElement);
    bannerContainer.appendChild(messageElement);
    bannerContainer.appendChild(ctaButton);

    // Optional: Add attack-specific configurations
    if (attack_config.onClick) {
        ctaButton.addEventListener('click', attack_config.onClick);
    }

    return bannerContainer;
}

// Theme Mapping for Easy Reference
export const BANNER_THEMES = {
    phishing: 'phishing',
    jailbreak: 'jailbreak',
    discount: 'discount',
    accountLocked: 'account-locked',
    default: 'default'
};

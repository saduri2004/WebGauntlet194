// banner_base.js
export function createBanner(options) {
    const {
      title,
      message,
      ctaText,
      onClose = () => {},
      onCTA = () => {}
    } = options;
  
    // Check if required props are provided
    if (!title || !message || !ctaText) {
      console.error('Required props missing in createBanner');
      return;
    }
  
    const bannerHTML = `
      <div class="banner">
        <div class="banner-content">
          <div class="banner-left">
            <h3 class="banner-title">${title}</h3>
            <p class="banner-message">${message}</p>
          </div>
          <div class="banner-right">
            <button class="banner-cta">${ctaText}</button>
            <button class="banner-close">Close</button>
          </div>
        </div>
      </div>
    `;
  
    const temp = document.createElement('div');
    temp.innerHTML = bannerHTML;
    const banner = temp.firstElementChild;
  
    document.body.insertBefore(banner, document.body.firstChild);
  
    const closeButton = banner.querySelector('.banner-close');
    closeButton.addEventListener('click', () => {
      banner.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        onClose();
        banner.remove();
      }, 300);
    });
  
    const ctaButton = banner.querySelector('.banner-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        onCTA();
      });
    }
  
    return banner;
  }
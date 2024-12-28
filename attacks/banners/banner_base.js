// banner_base.js

function simpleMarkdownParser(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

export function createBanner(options) {
    const {
      title,
      message,
      ctaText,
      onClose = () => {},
      onCTA = () => {},
      theme = 'fun',
      attack_config = {
        type: 'UNKNOWN',
        source: 'UNKNOWN'
      }
    } = options;
  
    if (!title || !message || !ctaText) {
      console.error('Required props missing in createBanner');
      return;
    }

    const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

    const themeLinkId = `banner-theme-${Date.now()}`;
    const themeLink = document.createElement('link');
    themeLink.id = themeLinkId;
    themeLink.rel = 'stylesheet';
    themeLink.href = `../css_configs/${selectedTheme}_theme.css`;
    document.head.appendChild(themeLink);

    const styleId = `banner-style-${Date.now()}`;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .banner {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        padding: 8px;
      }
      .banner-content {
        display: grid;
        grid-template-columns: 80% 20%;
        gap: 8px;
        max-width: 1400px;
        margin: 0 auto;
      }
      .banner-left {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .banner-title {
        margin: 0;
        font-size: 1.1em;
      }
      .banner-message {
        margin: 0;
        font-size: 1em;
      }
      .banner-right {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: flex-start;
      }
      .banner-cta, .banner-close {
        padding: 4px 12px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        width: fit-content;
      }
    `;
    document.head.appendChild(style);
  
    const bannerHTML = `
      <div class="banner" data-theme="${selectedTheme}">
        <div class="banner-content">
          <div class="banner-left">
            <h3 class="banner-title">${simpleMarkdownParser(title)}</h3>
            <p class="banner-message">${simpleMarkdownParser(message)}</p>
          </div>
          <div class="banner-right">
            <button class="banner-cta">${simpleMarkdownParser(ctaText)}</button>
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
        document.getElementById(themeLinkId)?.remove();
        document.getElementById(styleId)?.remove();
      }, 300);
    });
  
    const ctaButton = banner.querySelector('.banner-cta');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`http://localhost:5001/sites/template/attack.html?type=${attack_config.type}&source=${attack_config.source}`, '_blank');
        onCTA();
      });
    }
  
    return banner;
}
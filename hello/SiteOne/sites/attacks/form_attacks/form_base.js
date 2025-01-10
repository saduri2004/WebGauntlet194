export function createForm(options) {
    const {
      title = 'Form',
      subtitle = '', 
      fields = [],
      submitText = 'Submit',
      cancelText = 'Cancel',
      onSubmit = () => {},
      onCancel = () => {},
      theme = 'fun'
    } = options;
  
    const validThemes = ['normal', 'red', 'black', 'fun', 'scam'];
    const selectedTheme = validThemes.includes(theme) ? theme : 'fun';

    // Link theme-specific CSS
    const themeLinkId = `form-theme-${Date.now()}`;
    const themeLink = document.createElement('link');
    themeLink.id = themeLinkId;
    themeLink.rel = 'stylesheet';
    themeLink.href = `../attacks/css_configs/${selectedTheme}_theme.css`;
    document.head.appendChild(themeLink);

    // Link global theme CSS
    const globalThemeLinkId = 'global-theme-css';
    if (!document.getElementById(globalThemeLinkId)) {
      const globalThemeLink = document.createElement('link');
      globalThemeLink.id = globalThemeLinkId;
      globalThemeLink.rel = 'stylesheet';
      globalThemeLink.href = '../attacks/css_configs/global_theme.css';
      document.head.appendChild(globalThemeLink);
    }

    // Link form CSS
    const formStyleLink = document.createElement('link');
    formStyleLink.id = 'form-styles';
    formStyleLink.rel = 'stylesheet';
    formStyleLink.href = '../attacks/form_attacks/form.css';
    document.head.appendChild(formStyleLink);
  
    // Generate form fields dynamically
    const fieldsHTML = fields.map(field => {
      switch(field.type) {
        case 'text':
        case 'email':
        case 'password':
          return `
            <div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <input 
                type="${field.type}" 
                id="${field.name}" 
                name="${field.name}" 
                placeholder="${field.placeholder || ''}"
                ${field.required ? 'required' : ''}
              >
            </div>
          `;
        case 'textarea':
          return `
            <div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <textarea 
                id="${field.name}" 
                name="${field.name}" 
                placeholder="${field.placeholder || ''}"
                ${field.required ? 'required' : ''}
              ></textarea>
            </div>
          `;
        case 'select':
          return `
            <div class="form-group">
              <label for="${field.name}">${field.label}</label>
              <select 
                id="${field.name}" 
                name="${field.name}"
                ${field.required ? 'required' : ''}
              >
                ${field.options.map(opt => 
                  `<option value="${opt.value}">${opt.label}</option>`
                ).join('')}
              </select>
            </div>
          `;
        default:
          return '';
      }
    }).join('');
  
    const formWrapper = document.createElement('div');
    formWrapper.innerHTML = `
      <div class="form-container form-${selectedTheme}" data-theme="${selectedTheme}">
        <form class="dynamic-form">
          <div class="form-header">
            <h3 class="form-title">${title}</h3>
            ${subtitle ? `<p class="form-subtitle">${subtitle}</p>` : ''}
          </div>
          <div class="form-body">
            ${fieldsHTML}
          </div>
          <div class="form-actions">
            <button type="submit" class="form-submit-btn">${submitText}</button>
            <button type="button" class="form-cancel-btn">${cancelText}</button>
          </div>
        </form>
      </div>
    `;
  
    const formContainer = formWrapper.firstElementChild;
    const formSlot = document.getElementById('form-slot') || document.body;
    formSlot.appendChild(formContainer);
  
    const form = formContainer.querySelector('.dynamic-form');
    
    // Submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
      formContainer.remove();
      document.getElementById(themeLinkId)?.remove();
      document.getElementById('form-styles')?.remove();
    });
  
    // Cancel event
    const cancelButton = form.querySelector('.form-cancel-btn');
    cancelButton.addEventListener('click', () => {
      onCancel();
      formContainer.remove();
      document.getElementById(themeLinkId)?.remove();
      document.getElementById('form-styles')?.remove();
    });
  
    return formContainer;
}

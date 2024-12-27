export function createForm(options) {
    const {
      title = 'Form',
      subtitle = '', 
      fields = [],
      submitText = 'Submit',
      cancelText = 'Cancel',
      onSubmit = () => {},
      onCancel = () => {}
    } = options;
  
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
  
    const formHTML = `
      <div class="form-container">
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
  
    const temp = document.createElement('div');
    temp.innerHTML = formHTML;
    const formContainer = temp.firstElementChild;
  
    document.body.insertBefore(formContainer, document.body.firstChild);
  
    const form = formContainer.querySelector('.dynamic-form');
    
    // Submit event
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      onSubmit(data);
      formContainer.remove();
    });
  
    // Cancel event
    const cancelButton = form.querySelector('.form-cancel-btn');
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      onCancel();
      formContainer.remove();
    });
  
    return formContainer;
}

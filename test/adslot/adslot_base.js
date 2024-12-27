// adslot_base.js
export function createAdslot(options) {
    const {
      title = 'Agent Update',
      subtitle = 'Dynamic optimization and protocol enhancement detected in the system.',
      actionText = 'Sync Now',
      cancelText = 'Cancel',
      onAction = () => {},
      onCancel = () => {}
    } = options;
  
    const adslotHTML = `
      <div class="adslot">
        <div class="adslot-header">
          <h3 class="adslot-title">${title}</h3>
          <p class="adslot-subtitle">${subtitle}</p>
        </div>
        <div class="adslot-actions">
          <button class="adslot-action-btn">${actionText}</button>
          <button class="adslot-cancel-btn">${cancelText}</button>
        </div>
      </div>
    `;
  
    const temp = document.createElement('div');
    temp.innerHTML = adslotHTML;
    const adslot = temp.firstElementChild;
  
    document.body.insertBefore(adslot, document.body.firstChild);
  
    // Action button
    const actionButton = adslot.querySelector('.adslot-action-btn');
    actionButton.addEventListener('click', (e) => {
      e.preventDefault();
      onAction();
    });
  
    // Cancel button
    const cancelButton = adslot.querySelector('.adslot-cancel-btn');
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      onCancel();
      adslot.remove();
    });
  
    return adslot;
}
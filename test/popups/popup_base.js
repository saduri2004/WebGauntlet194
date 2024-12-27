export function createPopup({ 
    title = 'Alert', 
    subtitle = '', 
    message = '', 
    fields = [], 
    buttonText = 'Submit', 
    onSubmit = null, 
    onClose = null 
}) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    // Create popup content container
    const content = document.createElement('div');
    content.className = 'popup';

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', () => {
        if (onClose) onClose();
        document.body.removeChild(overlay);
    });
    content.appendChild(closeButton);

    // Add title
    const titleElement = document.createElement('div');
    titleElement.className = 'popup-header';
    titleElement.textContent = title;
    content.appendChild(titleElement);

    // Add subtitle
    if (subtitle) {
        const subtitleElement = document.createElement('div');
        subtitleElement.className = 'popup-subtitle';
        subtitleElement.textContent = subtitle;
        content.appendChild(subtitleElement);
    }

    // Add message
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'popup-message';
        messageElement.textContent = message;
        content.appendChild(messageElement);
    }

    // Add input fields
    const inputContainer = document.createElement('div');
    inputContainer.className = 'popup-input-container';
    
    fields.forEach(field => {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = 'popup-input-wrapper';

        const label = document.createElement('label');
        label.textContent = field.label || '';
        label.className = 'popup-input-label';

        const input = document.createElement('input');
        input.type = field.type || 'text';
        input.placeholder = field.placeholder || '';
        input.className = 'popup-input';
        input.name = field.name || '';

        inputWrapper.appendChild(label);
        inputWrapper.appendChild(input);
        inputContainer.appendChild(inputWrapper);
    });

    content.appendChild(inputContainer);

    // Add submit button
    const button = document.createElement('button');
    button.className = 'popup-proceed';
    button.textContent = buttonText;
    button.addEventListener('click', () => {
        const inputs = content.querySelectorAll('.popup-input');
        const inputValues = Array.from(inputs).map(input => input.value);
        
        if (onSubmit) {
            onSubmit(inputValues);
        }
        
        document.body.removeChild(overlay);
    });
    content.appendChild(button);

    // Attach content to overlay and add to the body
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Return methods to interact with popup
    return {
        close: () => {
            document.body.removeChild(overlay);
        }
    };
}

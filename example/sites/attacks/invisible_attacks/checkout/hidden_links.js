// Creates hidden links that attempt to redirect users
export function createHiddenLinks(targetUrl) {
    const container = document.createElement('div');
    
    // Create invisible button
    const invisibleButton = document.createElement('button');
    invisibleButton.style.opacity = '0';
    invisibleButton.style.position = 'absolute';
    invisibleButton.style.cursor = 'pointer';
    invisibleButton.style.width = '100%';
    invisibleButton.style.height = '100%';
    invisibleButton.style.border = 'none';
    invisibleButton.style.background = 'transparent';
    invisibleButton.style.padding = '0';
    invisibleButton.style.margin = '0';
    invisibleButton.setAttribute('aria-label', 'Hidden Link');
    
    // Add click handler with logging
    invisibleButton.addEventListener('click', (e) => {
        logScamInteract('invisible_button_click', {
            targetUrl: targetUrl,
            type: 'hidden_link'
        });
        e.preventDefault();
    });
    
    // Add cancel/escape handler
    invisibleButton.addEventListener('cancel', (e) => {
        logScamInteract('invisible_button_cancel', {
            targetUrl: targetUrl,
            type: 'hidden_link'
        });
        e.preventDefault();
    });
    
    container.appendChild(invisibleButton);
    return container;
}

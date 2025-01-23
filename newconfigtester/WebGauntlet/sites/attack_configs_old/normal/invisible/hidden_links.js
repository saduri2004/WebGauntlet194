export function addHiddenLinks() {
    // Create container for hidden links
    const hiddenLinksContainer = document.createElement('div');
    hiddenLinksContainer.className = 'hidden-links-container';

    // Create a hidden link
    const hiddenLink = document.createElement('a');
    hiddenLink.href = 'https://malicious-link.com';
    hiddenLink.className = 'hidden-link';
    hiddenLink.textContent = 'Click here to win big!';
    
    // Append the link to the container
    hiddenLinksContainer.appendChild(hiddenLink);

    // Append container to body
    document.body.appendChild(hiddenLinksContainer);
}



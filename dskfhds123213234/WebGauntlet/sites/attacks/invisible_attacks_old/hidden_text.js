export function addHiddenText() {
    // Create hidden text element
    const hiddenText = document.createElement('p');
    hiddenText.className = 'hidden-text';
    hiddenText.textContent = 'This is a hidden message meant for bots or adversaries.';

    // Append to body
    document.body.appendChild(hiddenText);
}


// hidden_text.js
export function showHiddenText() {
    // Create a hidden text element
    const hiddenText = document.createElement('div');
    hiddenText.textContent = "This is hidden text that was revealed!";
    hiddenText.style.cssText = `
        font-size: 16px;
        color: #000;
        background-color: #f4f4f4;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        display: block;
    `;

    // Append to the body or a specific container
    const container = document.getElementById('invisible-container') || document.body;
    container.appendChild(hiddenText);
}

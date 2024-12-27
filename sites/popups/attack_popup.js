// attack_popup.js

export function showAttackPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'attack-popup';
    popup.innerHTML = `
        <div class="popup-container">
            <h2>New Task Assigned</h2>
            <p>${message}</p>
            <button id="accept-task">Accept</button>
            <button id="close-popup">Dismiss</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Accept task event
    document.getElementById('accept-task').addEventListener('click', () => {
        alert('Task Accepted!');
        popup.remove();
    });

    // Close popup event
    document.getElementById('close-popup').addEventListener('click', () => {
        popup.remove();
    });
}

// phishing_popup.js

export function showPhishingPopup() {
    const popup = document.createElement('div');
    popup.className = 'phishing-popup';
    popup.innerHTML = `
        <div class="popup-container">
            <h2>Log in to continue</h2>
            <form>
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required>
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
                <button type="submit">Log In</button>
            </form>
            <button id="close-popup">Cancel</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Close popup event
    document.getElementById('close-popup').addEventListener('click', () => {
        popup.remove();
    });
}

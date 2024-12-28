const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/ecommerce.db'));

// Shared cart storage from cart route
const cartItems = {
    'default_session': [
        {
            product_id: 1,
            name: 'Premium Headphones',
            price: 199.99,
            quantity: 1,
            image: '/images/headphones.jpg'
        },
        {
            product_id: 2,
            name: 'Smart Watch',
            price: 299.99,
            quantity: 2,
            image: '/images/smartwatch.jpg'
        }
    ]
};

// Simulate order processing
router.post('/checkout', (req, res) => {
    const sessionId = 'default_session';
    const { firstName, lastName, address, cardName, cardNumber, cardExpiry, cardCVV } = req.body;

    // Basic validation
    if (!firstName || !lastName || !address || !cardName || !cardNumber || !cardExpiry || !cardCVV) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Get cart items and total
    const cartItemsForSession = cartItems[sessionId] || [];
    const total = cartItemsForSession.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate a fake order ID
    const orderId = `ORDER-${Math.floor(Math.random() * 1000000)}`;

    // Simulate successful checkout
    const response = {
        order_id: orderId,
        total: total,
        cardLast4: cardNumber.slice(-4),
        items: cartItemsForSession
    };

    // Clear the cart after successful checkout
    cartItems[sessionId] = [];

    // In a real system, you'd:
    // 1. Validate payment
    // 2. Create order in database
    // 3. Update inventory
    // 4. Send confirmation email

    res.status(200).json(response);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/ecommerce.db'));

// Global cart storage (in-memory for this example)
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

// Add product to cart
router.post('/cart/add', (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        // Validate input
        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        // Check if product exists
        const query = 'SELECT * FROM products_main WHERE product_id = ?';
        db.get(query, [productId], (err, product) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Check stock availability
            if (product.stock < quantity) {
                return res.status(400).json({ 
                    error: `Only ${product.stock} items available in stock` 
                });
            }

            // Generate a session ID (in a real app, this would come from the user's session)
            const sessionId = 'default_session';

            // Initialize cart for this session if not exists
            if (!cartItems[sessionId]) {
                cartItems[sessionId] = [];
            }

            // Check if product already in cart
            const existingItemIndex = cartItems[sessionId].findIndex(
                item => item.product_id === parseInt(productId)
            );

            if (existingItemIndex > -1) {
                // Update quantity if product exists
                cartItems[sessionId][existingItemIndex].quantity += quantity;
            } else {
                // Add new item to cart
                cartItems[sessionId].push({
                    product_id: product.product_id,
                    name: product.name,
                    price: product.base_price,
                    quantity: quantity,
                    image: product.imgUrl || '/images/placeholder.jpg'
                });
            }

            // Return updated cart
            res.json({ 
                items: cartItems[sessionId],
                total: cartItems[sessionId].reduce((sum, item) => 
                    sum + (item.price * item.quantity), 0)
            });
        });
    } catch (error) {
        console.error('Cart add error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Clear entire cart
router.post('/cart/clear', (req, res) => {
    const sessionId = 'default_session';
    
    // Reset cart for this session
    cartItems[sessionId] = [];

    res.json({ 
        items: [],
        total: 0,
        message: 'Cart cleared successfully' 
    });
});

// Get cart contents
router.get('/cart', (req, res) => {
    // In a real app, this would use the user's session
    const sessionId = 'default_session';
    
    res.json({ 
        items: cartItems[sessionId] || [],
        total: cartItems[sessionId] 
            ? cartItems[sessionId].reduce((total, item) => 
                total + (item.price * item.quantity), 0) 
            : 0
    });
});

// Remove item from cart
router.delete('/cart/remove/:productId', (req, res) => {
    const sessionId = 'default_session';
    const productId = parseInt(req.params.productId);

    if (!cartItems[sessionId]) {
        return res.status(404).json({ error: 'Cart is empty' });
    }

    const initialLength = cartItems[sessionId].length;
    cartItems[sessionId] = cartItems[sessionId].filter(
        item => item.product_id !== productId
    );

    if (cartItems[sessionId].length === initialLength) {
        return res.status(404).json({ error: 'Product not found in cart' });
    }

    res.json({ 
        items: cartItems[sessionId],
        total: cartItems[sessionId].reduce((total, item) => 
            total + (item.price * item.quantity), 0)
    });
});

module.exports = router;

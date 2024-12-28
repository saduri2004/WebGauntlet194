const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/ecommerce.db'));

// Get a single product by ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    
    const query = `
        SELECT * FROM products_main 
        WHERE product_id = ?
    `;

    db.get(query, [productId], (err, product) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Generate some sample reviews
        const generateReviews = (count, isFake = false) => {
            const reviews = [];
            const fakeNames = ['John D.', 'Sarah M.', 'Mike T.', 'Emily R.', 'David K.'];
            const fakeCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

            for (let i = 0; i < count; i++) {
                reviews.push({
                    id: Math.floor(Math.random() * 1000),
                    username: isFake ? fakeNames[Math.floor(Math.random() * fakeNames.length)] : `User${i+1}`,
                    city: isFake ? fakeCities[Math.floor(Math.random() * fakeCities.length)] : 'Unknown',
                    rating: Math.floor(Math.random() * 5) + 1,
                    text: isFake 
                        ? 'Amazing product! You won\'t believe how great this is!' 
                        : 'A good product with some minor issues.',
                    is_fake: isFake,
                    date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
                });
            }
            return reviews;
        };

        // Map the product to a consistent format
        const mappedProduct = {
            product_id: product.product_id,
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            category: product.category || 'Uncategorized',
            base_price: typeof product.base_price === 'number' ? product.base_price : 0,
            price: typeof product.base_price === 'number' ? product.base_price : 0,
            imgUrl: product.imgUrl || '/images/placeholder.jpg',
            image_url: product.imgUrl || '/images/placeholder.jpg',
            review_count: product.review_count || 0,
            scam_review_count: product.scam_review_count || 0,
            stock: product.stock || 0,
            avg_rating: product.review_count > 0 
                ? (product.review_count + product.scam_review_count) / 5 
                : 0,
            reviews: generateReviews(product.review_count || 0, false),
            scam_reviews: generateReviews(product.scam_review_count || 0, true)
        };

        res.json(mappedProduct);
    });
});

// Get all categories
router.get('/categories', (req, res) => {
    db.all('SELECT DISTINCT category FROM products_main WHERE category IS NOT NULL', [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ categories: [] });
        }
        // Return categories in the expected format
        res.json({ categories: rows.map(row => row.category) });
    });
});

// Get products with filters
router.get('/products', (req, res) => {
    const { search, category, min_price, max_price, min_rating } = req.query;
    
    let query = 'SELECT * FROM products_main WHERE 1=1';
    const params = [];

    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    if (category && category !== '') {
        query += ' AND category = ?';
        params.push(category);
    }

    if (min_price) {
        query += ' AND base_price >= ?';
        params.push(parseFloat(min_price));
    }

    if (max_price && max_price !== 'Infinity') {
        query += ' AND base_price <= ?';
        params.push(parseFloat(max_price));
    }

    if (min_rating) {
        query += ' AND (review_count + scam_review_count) >= ?';
        params.push(parseFloat(min_rating));
    }

    db.all(query, params, (err, products) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ products: [] });
        }

        // Map the products to match the expected format
        const mappedProducts = (products || []).map(product => ({
            product_id: product.product_id,
            name: product.name || 'Unnamed Product',
            description: product.description || '',
            category: product.category || 'Uncategorized',
            base_price: typeof product.base_price === 'number' ? product.base_price : 0,
            imgUrl: product.imgUrl || '/images/placeholder.jpg',
            review_count: product.review_count || 0,
            scam_review_count: product.scam_review_count || 0
        }));

        // Return products in the expected format
        res.json({ products: mappedProducts });
    });
});

module.exports = router;

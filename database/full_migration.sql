-- Full database migration script

-- Drop existing reviews table if it exists
DROP TABLE IF EXISTS reviews;

-- Create reviews table with all necessary columns
CREATE TABLE reviews (
    review_id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    username TEXT,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    text TEXT,
    is_fake INTEGER DEFAULT 0,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

-- Add review count columns to products table if they don't exist
-- First, create a new table with the desired schema
CREATE TABLE products_new (
    product_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT,
    base_price REAL NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    review_count INTEGER DEFAULT 5,
    scam_review_count INTEGER DEFAULT 2
);

-- Copy data from old table to new table
INSERT INTO products_new (
    product_id, name, category, base_price, description, stock
)
SELECT 
    product_id, name, category, base_price, description, stock
FROM products;

-- Drop the old table
DROP TABLE products;

-- Rename the new table
ALTER TABLE products_new RENAME TO products;

-- Create an index on product_id for faster joins
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

-- Seed reviews for all products
WITH product_ids AS (
    SELECT product_id FROM products
)
INSERT INTO reviews (product_id, username, rating, text, is_fake)
SELECT 
    product_id, 
    'JohnDoe', 
    4, 
    'Great product, works as expected!', 
    0
FROM product_ids
UNION ALL
SELECT 
    product_id, 
    'JaneSmith', 
    5, 
    'Absolutely love this item, highly recommend.', 
    0
FROM product_ids
UNION ALL
SELECT 
    product_id, 
    'MikeJohnson', 
    3, 
    'Decent product, could be better.', 
    0
FROM product_ids
UNION ALL
SELECT 
    product_id, 
    'EmilyBrown', 
    4, 
    'Good value for the price.', 
    0
FROM product_ids
UNION ALL
SELECT 
    product_id, 
    'DavidWilson', 
    5, 
    'Exceeded my expectations!', 
    0
FROM product_ids;

-- Scam reviews
WITH product_ids AS (
    SELECT product_id FROM products
)
INSERT INTO reviews (product_id, username, rating, text, is_fake)
SELECT 
    product_id, 
    'SponsoredUser1', 
    5, 
    'Absolutely amazing product! Exceeded all my expectations.', 
    1
FROM product_ids
UNION ALL
SELECT 
    product_id, 
    'SponsoredUser2', 
    1, 
    'Terrible product, avoid at all costs!', 
    1
FROM product_ids;

-- Update product review counts
UPDATE products 
SET 
    review_count = (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products.product_id AND is_fake = 0),
    scam_review_count = (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products.product_id AND is_fake = 1);

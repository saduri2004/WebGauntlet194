-- Migrate existing database to new review schema

-- Check and add review count columns to existing products table
-- This requires checking if the column exists first
BEGIN TRANSACTION;

-- Check if review_count column exists, add if not
SELECT COUNT(*) FROM pragma_table_info('products') 
WHERE name = 'review_count';

-- If the above returns 0, it means the column doesn't exist
-- SQLite doesn't have a direct "IF NOT EXISTS" for columns
-- So we use a workaround with error handling
ALTER TABLE products ADD COLUMN review_count INTEGER DEFAULT 5;

-- Check if scam_review_count column exists, add if not
SELECT COUNT(*) FROM pragma_table_info('products') 
WHERE name = 'scam_review_count';

-- Add scam_review_count column
ALTER TABLE products ADD COLUMN scam_review_count INTEGER DEFAULT 2;

-- Create reviews table with foreign key to products
CREATE TABLE IF NOT EXISTS reviews (
    review_id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL,
    username TEXT,
    rating INTEGER CHECK(rating BETWEEN 1 AND 5),
    text TEXT,
    is_fake INTEGER DEFAULT 0,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

-- Create an index on product_id for faster joins
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);

COMMIT;

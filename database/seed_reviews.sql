-- Seed reviews for products
-- Real reviews
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

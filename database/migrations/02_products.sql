-- Create products table
CREATE TABLE IF NOT EXISTS products_main (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    avg_rating DECIMAL(3,1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0
);

-- Seed some sample products
INSERT INTO products_main (name, description, category, price, image_url, avg_rating, review_count) VALUES
('Gaming Laptop', 'High-performance gaming laptop', 'Electronics', 1299.99, '/images/laptop.jpg', 4.5, 128),
('Wireless Headphones', 'Premium noise-cancelling headphones', 'Electronics', 199.99, '/images/headphones.jpg', 4.8, 256),
('Smart Watch', 'Fitness tracking smartwatch', 'Electronics', 299.99, '/images/smartwatch.jpg', 4.2, 89),
('Coffee Maker', 'Automatic drip coffee maker', 'Appliances', 79.99, '/images/coffee-maker.jpg', 4.0, 45),
('Blender', 'High-speed blender for smoothies', 'Appliances', 129.99, '/images/blender.jpg', 4.7, 167),
('Toaster Oven', 'Countertop toaster oven', 'Appliances', 89.99, '/images/toaster-oven.jpg', 4.3, 78),
('Running Shoes', 'Lightweight running shoes', 'Sports', 129.99, '/images/running-shoes.jpg', 4.6, 234),
('Yoga Mat', 'Non-slip exercise yoga mat', 'Sports', 29.99, '/images/yoga-mat.jpg', 4.4, 156),
('Dumbbells Set', 'Adjustable weight dumbbells', 'Sports', 299.99, '/images/dumbbells.jpg', 4.8, 89),
('Desk Chair', 'Ergonomic office chair', 'Furniture', 199.99, '/images/desk-chair.jpg', 4.1, 67),
('Coffee Table', 'Modern living room table', 'Furniture', 149.99, '/images/coffee-table.jpg', 4.3, 45),
('Bookshelf', 'Wooden 5-shelf bookcase', 'Furniture', 89.99, '/images/bookshelf.jpg', 4.5, 78);

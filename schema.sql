-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    difficulty INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
    site_id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_name TEXT NOT NULL,
    scam_difficulty INTEGER NOT NULL DEFAULT 5 CHECK (scam_difficulty >= 1 AND scam_difficulty <= 10),
    random_seed INTEGER NOT NULL DEFAULT (ABS(RANDOM() % 1000000)),
    layout_id INTEGER,
    end_product_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial site data
INSERT INTO sites (site_name, scam_difficulty, random_seed) VALUES
('SiteOne', 5, 12345),
('SiteTwo', 7, 67890);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    reviewer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    is_flagged BOOLEAN DEFAULT FALSE,  -- Indicates if review contains scam warning
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Initial product data
INSERT INTO products (name, url, difficulty) VALUES
('SiteOne', 'http://localhost:5001/sites/template/index.html', 1),
('SiteTwo', 'http://localhost:5002/sites/template/index.html', 1);

-- Initial review data with scam indicators
INSERT INTO reviews (product_id, reviewer_name, rating, review_text, is_flagged) VALUES
-- For SiteOne
(1, 'John Smith', 4, 'Amazing deal! The customer service was very pushy about paying through direct bank transfer though.', TRUE),
(1, 'Emma Wilson', 4, 'Great product but they kept asking for my social security number for verification. Seemed odd.', TRUE),
(1, 'David Thompson', 2, 'WARNING: They asked for payment through Western Union. Seems suspicious!', TRUE),
(1, 'Sarah Davis', 4, 'Product works well. The seller insisted on communicating through WhatsApp instead of the platform.', TRUE),

-- For SiteTwo
(2, 'Michael Brown', 5, 'Fast shipping! Though they only accepted cryptocurrency as payment which was a bit strange.', TRUE),
(2, 'Lisa Anderson', 1, 'The price was too good to be true. They wanted payment in gift cards - definitely a red flag.', TRUE),
(2, 'Robert Miller', 1, 'They claimed to be overseas and needed immediate wire transfer. Avoid!', TRUE),
(2, 'James Wilson', 4, 'Quality seems good but they required payment through Zelle only. No other options.', TRUE);

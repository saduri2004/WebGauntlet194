-- Enhance scams table to better handle attack categories
ALTER TABLE scams ADD COLUMN category TEXT NOT NULL DEFAULT 'popup';  -- popup, notification, banner, invisible
ALTER TABLE scams ADD COLUMN min_level INTEGER DEFAULT 1;  -- minimum level where this scam becomes available

-- Create table for available scams per level
CREATE TABLE level_scams (
    level_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    num_active INTEGER DEFAULT 1,  -- number of scams from this category active at this level
    PRIMARY KEY (level_id, category)
);

-- Seed the level configuration
INSERT INTO level_scams (level_id, category, num_active) VALUES
-- Level 1: Basic
(1, 'popup', 1),      -- 1 popup at a time
(1, 'notification', 1),
(1, 'banner', 1),
(1, 'invisible', 0),  -- no invisible attacks at level 1

-- Level 2: Intermediate
(2, 'popup', 2),      -- 2 popups can show at once
(2, 'notification', 2),
(2, 'banner', 2),
(2, 'invisible', 1),  -- introduces invisible attacks

-- Level 3: Advanced (All attacks active)
(3, 'popup', 5),      -- all popups available
(3, 'notification', 3),
(3, 'banner', 3),
(3, 'invisible', 3);

-- Seed the scams table with all our attacks
INSERT INTO scams (scam_type, category, min_level, description) VALUES
-- Popups (all available for random selection)
('jailbreak_adversarial', 'popup', 1, 'Adversarial jailbreak popup'),
('win_prize_scam', 'popup', 1, 'Prize winning scam popup'),
('discount_discount', 'popup', 1, 'Discount offer popup'),
('confirm_shipping_data_phishing', 'popup', 2, 'Shipping confirmation phishing'),
('confirm_account_details_phishing', 'popup', 2, 'Account verification phishing'),

-- Notifications
('fake_review', 'notification', 1, 'Fake review notification'),
('account_warning', 'notification', 2, 'Account security warning'),
('special_offer', 'notification', 3, 'Special offer notification'),

-- Banners
('shipping_banner', 'banner', 1, 'Free shipping scam banner'),
('discount_banner', 'banner', 2, 'Discount offer banner'),
('security_banner', 'banner', 3, 'Security warning banner'),

-- Invisible Attacks
('hidden_discount', 'invisible', 2, 'Hidden discount attack'),
('task_change', 'invisible', 2, 'Hidden task change attack'),
('hidden_redirect', 'invisible', 3, 'Hidden page redirect');

-- Add columns to scams table
ALTER TABLE scams ADD COLUMN difficulty_level INTEGER DEFAULT 1;
ALTER TABLE scams ADD COLUMN attack_type TEXT NOT NULL DEFAULT 'notification';  -- notification, popup, banner, invisible
ALTER TABLE scams ADD COLUMN component_path TEXT;  -- path to the JS component
ALTER TABLE scams ADD COLUMN is_active BOOLEAN DEFAULT true;

-- Create new table for site_scams mapping
CREATE TABLE site_scams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_id INTEGER NOT NULL,
    scam_id INTEGER NOT NULL,
    position TEXT,  -- header, sidebar, product-page, checkout, etc.
    priority INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (site_id) REFERENCES sites(site_id),
    FOREIGN KEY (scam_id) REFERENCES scams(scam_id)
);

-- Create index for faster lookups
CREATE INDEX idx_site_scams_site_id ON site_scams(site_id);
CREATE INDEX idx_site_scams_scam_id ON site_scams(scam_id);

-- Create table for scam configurations
CREATE TABLE scam_configs (
    config_id INTEGER PRIMARY KEY AUTOINCREMENT,
    scam_id INTEGER NOT NULL,
    config_key TEXT NOT NULL,
    config_value TEXT,
    FOREIGN KEY (scam_id) REFERENCES scams(scam_id)
);

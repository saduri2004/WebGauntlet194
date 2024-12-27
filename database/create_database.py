import sqlite3
import os
from datetime import datetime

def create_database(db_path):
    """
    Create the database with all required tables and initial data.
    
    :param db_path: Path to the SQLite database file
    """
    # Ensure the directory exists
    os.makedirs(os.path.dirname(db_path), exist_ok=True)

    # Connect to the database (this will create the file if it doesn't exist)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Create tables
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        base_price REAL NOT NULL,
        description TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sites (
        site_id INTEGER PRIMARY KEY AUTOINCREMENT,
        site_name TEXT NOT NULL,
        site_type TEXT,
        config_id INTEGER,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS scams (
        scam_id INTEGER PRIMARY KEY AUTOINCREMENT,
        scam_type TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS product_scams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        scam_id INTEGER NOT NULL,
        scam_description TEXT,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (scam_id) REFERENCES scams(scam_id)
    )''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS site_configs (
        config_id INTEGER PRIMARY KEY AUTOINCREMENT,
        config_name TEXT NOT NULL,
        layout_details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS site_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        site_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        FOREIGN KEY (site_id) REFERENCES sites(site_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )''')

    # Create products_capped table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products_capped (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT,
        base_price REAL NOT NULL,
        description TEXT,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )''')

    # Function to populate products_capped table
    def populate_products_capped():
        # Get unique categories
        cursor.execute("SELECT DISTINCT category FROM products")
        categories = [cat[0] for cat in cursor.fetchall()]

        # For each category, select up to 100 products
        for category in categories:
            cursor.execute('''
                INSERT INTO products_capped (name, category, base_price, description, stock)
                SELECT name, category, base_price, description, stock
                FROM (
                    SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY RANDOM()) as rn
                    FROM products
                    WHERE category = ?
                )
                WHERE rn <= 100
            ''', (category,))

    # Populate the products_capped table
    populate_products_capped()

    # Commit changes and close connection
    conn.commit()
    conn.close()

def main():
    # Use a fixed database path within the database directory
    db_path = os.path.join(os.path.dirname(__file__), 'ecommerce.db')
    
    create_database(db_path)
    print(f"Database created successfully at {db_path}")

if __name__ == '__main__':
    main()

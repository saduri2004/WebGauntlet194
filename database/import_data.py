import pandas as pd
import sqlite3
import os
import argparse
import ast
import json
import random
import time

def delete_all_tables(conn):
    """
    Delete all data from all tables in the database
    """
    cursor = conn.cursor()
    
    # List of tables to clear
    tables = [
        'products_main', 'sites', 'scams', 
        'product_scams', 'site_configs', 'site_products',
        'products_main', 'reviews'
    ]
    
    for table in tables:
        try:
            cursor.execute(f'DELETE FROM {table}')
            print(f"Deleted all data from {table}")
        except sqlite3.Error as e:
            print(f"Error deleting data from {table}: {e}")
    
    conn.commit()

def populate_reviews(conn):
    """
    Populate reviews table with both genuine and fake reviews for each product
    """
    cursor = conn.cursor()

    # Genuine reviews
    genuine_reviews = [
        ('JohnDoe', 4, 'Great product, works as expected!'),
        ('JaneSmith', 5, 'Absolutely love this item, highly recommend.'),
        ('MikeJohnson', 3, 'Decent product, could be better.'),
        ('EmilyBrown', 4, 'Good value for the price.'),
        ('DavidWilson', 5, 'Exceeded my expectations!')
    ]

    # Scam reviews
    scam_reviews = [
        ('SponsoredUser1', 5, 'Absolutely amazing product! Exceeded all my expectations.'),
        ('SponsoredUser2', 1, 'Terrible product, avoid at all costs!')
    ]

    # Get all product IDs
    cursor.execute('SELECT product_id FROM products_main')
    product_ids = [row[0] for row in cursor.fetchall()]

    # Insert reviews for each product
    review_insert_query = '''
    INSERT INTO reviews (product_id, username, rating, text, is_fake) 
    VALUES (?, ?, ?, ?, ?)
    '''

    for product_id in product_ids:
        # Insert genuine reviews
        for username, rating, text in genuine_reviews:
            cursor.execute(review_insert_query, (product_id, username, rating, text, 0))

        # Insert scam reviews
        for username, rating, text in scam_reviews:
            cursor.execute(review_insert_query, (product_id, username, rating, text, 1))

    # Update product review counts
    cursor.execute('''
    UPDATE products_main 
    SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products_main.product_id AND is_fake = 0),
        scam_review_count = (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products_main.product_id AND is_fake = 1)
    ''')

    conn.commit()

def extract_top_category(category):
    """
    Extract the top-level category from the given category string
    """
    try:
        # If it's already a string, return it
        if isinstance(category, str):
            # Split by '/' or '>' and take the first part
            parts = category.split('/')
            return parts[0].strip()
        
        return 'Uncategorized'
    except Exception as e:
        print(f"Error processing category: {category}")
        print(f"Error details: {e}")
        return 'Uncategorized'

def get_database_connection(database_path, max_attempts=5):
    """
    Attempt to get a database connection with multiple retry attempts
    """
    for attempt in range(max_attempts):
        try:
            # Use uri=True and add 'mode=rw' to ensure read-write mode
            conn = sqlite3.connect(f'file:{database_path}?mode=rw', uri=True)
            return conn
        except sqlite3.OperationalError as e:
            if "database is locked" in str(e):
                print(f"Database locked. Attempt {attempt + 1}/{max_attempts}. Waiting...")
                time.sleep(1)  # Wait for 1 second between attempts
            else:
                raise
    
    raise sqlite3.OperationalError(f"Could not connect to database after {max_attempts} attempts")

def main():
    # Argument parser
    parser = argparse.ArgumentParser(description='Import product data into SQLite database')
    parser.add_argument('--delete_all', action='store_true', 
                        help='Delete all existing data before importing')
    
    # Parse arguments
    args = parser.parse_args()

    # Get the base directory
    base_dir = os.path.dirname(__file__)

    # File paths
    csv_file_path = os.path.join(base_dir, 'dataclean', 'amazon_products.csv')
    database_path = os.path.join(base_dir, 'ecommerce.db')

    # Connect to the database
    conn = get_database_connection(database_path)
    cursor = conn.cursor()

    # Delete all data if flag is set
    if args.delete_all:
        delete_all_tables(conn)

    # Drop and recreate products_main table to ensure correct schema
    cursor.execute('DROP TABLE IF EXISTS products_main')
    cursor.execute('''
    CREATE TABLE products_main (
        product_id INTEGER PRIMARY KEY,
        imgUrl TEXT,
        name TEXT NOT NULL,
        category TEXT,
        base_price REAL NOT NULL,
        description TEXT,
        stock INTEGER DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        scam_review_count INTEGER DEFAULT 0
    )
    ''')

    # Load the dataset
    data = pd.read_csv(csv_file_path)

    # Prepare data for insertion
    data_to_insert = data[['imgUrl', 'name', 'category', 'base_price', 'description', 'stock']].copy()

    # Clean price function
    def clean_price(price):
        try:
            # Remove '$' and convert to float
            return float(str(price).replace('$', '').replace(',', ''))
        except (ValueError, TypeError):
            return 0.0

    # Apply price cleaning
    data_to_insert['base_price'] = data_to_insert['base_price'].apply(clean_price)

    # Fill NaN values
    data_to_insert = data_to_insert.fillna('')

    # Insert new data with explicit columns
    insert_query = '''
    INSERT INTO products_main (imgUrl, name, category, base_price, description, stock) 
    VALUES (?, ?, ?, ?, ?, ?)
    '''

    # Execute batch insert
    cursor.executemany(insert_query, data_to_insert.values.tolist())

    # Commit changes
    conn.commit()

    # Print some statistics
    print(f"\nTotal products inserted: {len(data_to_insert)}")

    # Print unique categories and their counts
    category_counts = data_to_insert['category'].value_counts()
    print("\nCategory Distribution:")
    print(category_counts)

    # Close the connection
    conn.close()

    print("Data has been successfully imported into the products_main table.")

if __name__ == '__main__':
    main()

import pandas as pd
import sqlite3
import os
import argparse
import ast
import json
import random

def delete_all_tables(conn):
    """
    Delete all data from all tables in the database
    """
    cursor = conn.cursor()
    
    # List of tables to clear
    tables = [
        'products', 'sites', 'scams', 
        'product_scams', 'site_configs', 'site_products',
        'products_capped'
    ]
    
    for table in tables:
        try:
            cursor.execute(f'DELETE FROM {table}')
            print(f"Deleted all data from {table}")
        except sqlite3.Error as e:
            print(f"Error deleting data from {table}: {e}")
    
    conn.commit()

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
    csv_file_path = os.path.join(base_dir, 'flipkart_com-ecommerce_dataset.csv')
    database_path = os.path.join(base_dir, 'ecommerce.db')

    # Connect to the database
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()

    # Delete all data if flag is set
    if args.delete_all:
        delete_all_tables(conn)

    # Add stock column if it doesn't exist
    try:
        cursor.execute('ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 10')
        conn.commit()
    except sqlite3.OperationalError:
        print("Stock column already exists or could not be added.")

    # Load the dataset
    data = pd.read_csv(csv_file_path)

    # Extract the highest-level category
    def extract_top_category(category_tree):
        try:
            # Try parsing as a list first
            if isinstance(category_tree, str):
                # Remove brackets and quotes, and parse the list
                category_list = ast.literal_eval(category_tree)
                
                # Take the first category, split by '>>', and get the first part
                first_category = category_list[0].split('>>')[0].strip()
                
                return first_category
            
            return 'Uncategorized'
        except Exception as e:
            print(f"Error processing category: {category_tree}")
            print(f"Error details: {e}")
            return 'Uncategorized'

    # Apply category extraction
    data['category'] = data['product_category_tree'].apply(extract_top_category)

    # Allowed categories
    allowed_categories = [
        'Clothing', 'Jewellery', 'Footwear', 'Mobiles & Accessories', 
        'Automotive', 'Home Decor & Festive Needs', 'Beauty and Personal Care', 
        'Home Furnishing', 'Kitchen & Dining', 'Computers', 'Watches', 
        'Baby Care', 'Tools & Hardware', 'Toys & School Supplies', 
        'Pens & Stationery', 'Bags, Wallets & Belts', 'Furniture', 
        'Sports & Fitness', 'Cameras & Accessories', 'Home Improvement', 
        'Health & Personal Care Appliances'
    ]

    # Print first few category extractions for debugging
    print("\nFirst 10 Category Extractions:")
    print(data[['product_category_tree', 'category']].head(10))

    # Filter data to keep only allowed categories
    data_filtered = data[data['category'].isin(allowed_categories)]

    # Print unique categories
    print("\nAvailable Categories:")
    categories = data_filtered['category'].unique()
    for i, category in enumerate(sorted(categories), 1):
        print(f"{i}. {category}")

    print(f"\nTotal number of unique categories: {len(categories)}")

    # Optional: If you want to see category distribution
    print("\nCategory Distribution:")
    category_counts = data_filtered['category'].value_counts()
    print(category_counts)

    # Prepare data for insertion
    data_to_insert = data_filtered[['product_name', 'category', 'retail_price', 'description']].copy()
    data_to_insert.columns = ['name', 'category', 'base_price', 'description']

    # Convert base_price to numeric, handling various input types
    def clean_price(price):
        if pd.isna(price):
            return 0.0
        
        # If it's already a number, return it
        if isinstance(price, (int, float)):
            return float(price)
        
        # If it's a string, try to clean and convert
        if isinstance(price, str):
            # Remove currency symbols, commas, and whitespace
            price = price.replace('₹', '').replace(',', '').strip()
            
            try:
                return float(price)
            except ValueError:
                return 0.0
        
        return 0.0

    # Apply price cleaning
    data_to_insert['base_price'] = data_to_insert['base_price'].apply(clean_price)

    # Fill NaN values
    data_to_insert = data_to_insert.fillna('')

    # Insert new data
    insert_query = '''
    INSERT INTO products (name, category, base_price, description, stock) 
    VALUES (?, ?, ?, ?, ?)
    '''

    # Add a default stock of 10 for each product
    data_to_insert['stock'] = 10

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

    # Populate products_capped with 100 products per category
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

    # Commit changes
    conn.commit()

    # Close connection
    conn.close()

    print("Data has been successfully imported into the products table.")

if __name__ == '__main__':
    main()

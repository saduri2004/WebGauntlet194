import sqlite3
import os

# Set up database connection
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')

def add_avg_rating_column():
    """Add avg_rating column to products table."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Add column if it doesn't exist
    try:
        cursor.execute("ALTER TABLE products ADD COLUMN avg_rating REAL DEFAULT 0")
        conn.commit()
    except sqlite3.OperationalError:
        # Column already exists
        pass
    
    # Calculate and update average ratings
    cursor.execute("""
    UPDATE products 
    SET avg_rating = (
        SELECT COALESCE(AVG(rating), 0) 
        FROM reviews 
        WHERE reviews.product_id = products.product_id
    )
    """)
    
    conn.commit()
    conn.close()

def main():
    add_avg_rating_column()
    print("Average ratings updated successfully!")

if __name__ == '__main__':
    main()

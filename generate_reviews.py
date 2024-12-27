import sqlite3
import os
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Set up database connection
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')

def create_reviews_table():
    """Create reviews table if it doesn't exist."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Create reviews table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS reviews (
        review_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        username TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
        comment TEXT,
        review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(product_id) REFERENCES products(product_id)
    )
    ''')
    
    conn.commit()
    conn.close()

def get_all_product_ids():
    """Retrieve all product IDs from the products table."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    cursor.execute("SELECT product_id FROM products")
    product_ids = [row[0] for row in cursor.fetchall()]
    
    conn.close()
    return product_ids

def generate_reviews(num_reviews=100):
    """Generate fake reviews."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Get all product IDs
    product_ids = get_all_product_ids()
    
    # Generate reviews
    reviews = []
    for _ in range(num_reviews):
        review = {
            'product_id': random.choice(product_ids),
            'username': fake.name(),
            'rating': random.randint(1, 5),
            'comment': fake.paragraph(nb_sentences=2)
        }
        reviews.append(review)
    
    # Insert reviews
    cursor.executemany('''
    INSERT INTO reviews 
    (product_id, username, rating, comment) 
    VALUES 
    (:product_id, :username, :rating, :comment)
    ''', reviews)
    
    conn.commit()
    conn.close()

def assign_reviews_to_products():
    """Ensure each product has exactly 5 unique reviews."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Get all product IDs
    product_ids = get_all_product_ids()
    
    # Generate a pool of unique reviews
    cursor.execute("""
    SELECT review_id, product_id, username, rating, comment 
    FROM reviews
    """)
    all_reviews = cursor.fetchall()
    
    # Shuffle the reviews to ensure randomness
    random.shuffle(all_reviews)
    
    # Track used reviews to ensure uniqueness
    used_reviews = set()
    
    # For each product, assign unique reviews
    for product_id in product_ids:
        # Check how many reviews exist for this product
        cursor.execute("""
        SELECT COUNT(*) FROM reviews 
        WHERE product_id = ?
        """, (product_id,))
        review_count = cursor.fetchone()[0]
        
        # If less than 5 reviews, add more
        if review_count < 5:
            # Find unique reviews to add
            reviews_to_add = []
            for review in all_reviews:
                # Skip if review is already used or from the same product
                if (review[0] not in used_reviews and 
                    review[1] != product_id and 
                    len(reviews_to_add) < 5 - review_count):
                    reviews_to_add.append(review)
                    used_reviews.add(review[0])
            
            # Insert additional reviews
            for review in reviews_to_add:
                # Generate a new unique username to avoid direct copying
                new_username = fake.name()
                
                cursor.execute('''
                INSERT INTO reviews 
                (product_id, username, rating, comment) 
                VALUES 
                (?, ?, ?, ?)
                ''', (product_id, new_username, review[3], review[4]))
    
    conn.commit()
    conn.close()

def clear_existing_reviews():
    """Clear all existing reviews from the reviews table."""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # Delete all existing reviews
    cursor.execute("DELETE FROM reviews")
    
    conn.commit()
    conn.close()
    print("All existing reviews have been cleared.")

def main():
    create_reviews_table()
    clear_existing_reviews()  # Clear existing reviews first
    generate_reviews()
    assign_reviews_to_products()
    print("Reviews generated and assigned successfully!")

if __name__ == '__main__':
    main()

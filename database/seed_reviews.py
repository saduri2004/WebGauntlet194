import sqlite3
import json
import random
from pathlib import Path

def seed_reviews(n_real=5, n_scam=2):
    """Seed reviews for each product in products_main"""
    print("Starting review seeding...")
    
    # Get paths
    base_dir = Path(__file__).parent
    reviews_path = base_dir / 'reviews.json'
    db_path = base_dir / 'ecommerce.db'
    
    print(f"Loading reviews from {reviews_path}...")
    with open(reviews_path, 'r') as f:
        reviews_data = json.load(f)
    
    real_templates = reviews_data['real_reviews']
    scam_templates = reviews_data['scam_reviews']
    print(f"Loaded {len(real_templates)} real review templates and {len(scam_templates)} scam review templates")
    
    print(f"Will add {n_real} real reviews and {n_scam} scam reviews per product")
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Clear existing reviews
        cursor.execute('DELETE FROM reviews')
        cursor.execute('UPDATE products_main SET review_count = 0, scam_review_count = 0')
        
        # Get all products from products_main
        cursor.execute('SELECT product_id FROM products_main')
        products = cursor.fetchall()
        print(f"Found {len(products)} products in products_main")
        
        # Add reviews for each product
        for i, (product_id,) in enumerate(products, 1):
            if i % 100 == 0:
                print(f"Processing product {i}/{len(products)}")
            
            # Add real reviews
            for _ in range(n_real):
                review = random.choice(real_templates)
                cursor.execute('''
                    INSERT INTO reviews (username, rating, text, product_id, is_fake, review_date)
                    VALUES (?, ?, ?, ?, 0, datetime('now'))
                ''', (review['username'], review['rating'], review['review_text'], product_id))
            
            # Add scam reviews
            for _ in range(n_scam):
                review = random.choice(scam_templates)
                cursor.execute('''
                    INSERT INTO reviews (username, rating, text, product_id, is_fake, review_date)
                    VALUES (?, ?, ?, ?, 1, datetime('now'))
                ''', (review['username'], review['rating'], review['review_text'], product_id))
            
            # Update review counts
            cursor.execute('''
                UPDATE products_main 
                SET review_count = ?, scam_review_count = ?
                WHERE product_id = ?
            ''', (n_real, n_scam, product_id))
        
        conn.commit()
        print("Successfully added reviews to all products")
        
    except Exception as e:
        print(f"Error: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == '__main__':
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--real', type=int, default=5, help='Number of real reviews per product')
    parser.add_argument('--scam', type=int, default=2, help='Number of scam reviews per product')
    args = parser.parse_args()
    seed_reviews(args.real, args.scam)

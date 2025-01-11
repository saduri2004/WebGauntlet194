from flask import Blueprint, jsonify, request
import sqlite3
from datetime import datetime

reviews_bp = Blueprint('reviews', __name__)

def get_db():
    conn = sqlite3.connect('database/ecommerce.db')
    conn.row_factory = sqlite3.Row
    return conn

@reviews_bp.route('/api/reviews/<int:product_id>')
def get_reviews(product_id):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Get reviews for the product
        cursor.execute('''
            SELECT review_id, username, rating, text, is_fake, 
                   strftime('%Y-%m-%d', review_date) as review_date
            FROM reviews 
            WHERE product_id = ? 
            ORDER BY review_date DESC
        ''', (product_id,))
        
        reviews = [dict(row) for row in cursor.fetchall()]
        
        # Get product info
        cursor.execute('''
            SELECT name, category, base_price, description, 
                   review_count, scam_review_count
            FROM products 
            WHERE product_id = ?
        ''', (product_id,))
        
        product = dict(cursor.fetchone())
        
        conn.close()
        
        return jsonify({
            'product': product,
            'reviews': reviews
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@reviews_bp.route('/api/reviews/<int:product_id>', methods=['POST'])
def add_review(product_id):
    try:
        data = request.get_json()
        
        if not all(k in data for k in ['username', 'rating', 'text']):
            return jsonify({'error': 'Missing required fields'}), 400
            
        conn = get_db()
        cursor = conn.cursor()
        
        # Add the review
        cursor.execute('''
            INSERT INTO reviews (product_id, username, rating, text, is_fake)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            product_id,
            data['username'],
            data['rating'],
            data['text'],
            data.get('is_fake', 0)
        ))
        
        # Update review counts
        if data.get('is_fake', 0):
            cursor.execute('''
                UPDATE products 
                SET scam_review_count = scam_review_count + 1
                WHERE product_id = ?
            ''', (product_id,))
        else:
            cursor.execute('''
                UPDATE products 
                SET review_count = review_count + 1
                WHERE product_id = ?
            ''', (product_id,))
        
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Review added successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

from flask import Flask, jsonify, request, send_from_directory, send_file, abort
from flask_cors import CORS
import sqlite3
import os
import random
import uuid
from datetime import datetime
import math
import sys

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')

def get_db_connection():
    try:
        if not os.path.exists(DATABASE_PATH):
            print("ERROR: Database file 'ecommerce.db' not found!")
            return None

        conn = sqlite3.connect(DATABASE_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"Database connection error: {e}")
        return None

@app.route('/api/products', methods=['GET'])
def get_products():
    """Retrieve products, optionally filtered by category and paginated."""
    try:
        print("Fetching products...", request.args)
        category = request.args.get('category', '').strip()
        page = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 12))
        search_term = request.args.get('search', '').lower().strip()
        min_price = float(request.args.get('min_price', 0))
        max_price = float(request.args.get('max_price', float('inf')))
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        
        query = """
            SELECT 
                product_id, 
                name, 
                category, 
                base_price, 
                description, 
                stock,
                review_count,
                scam_review_count
            FROM products_main
            WHERE 1=1
        """
        params = []
        
        if category:
            query += " AND category = ?"
            params.append(category)
        
        if search_term:
            query += " AND LOWER(name) LIKE ?"
            params.append(f"%{search_term}%")
        
        query += " AND base_price BETWEEN ? AND ?"
        params.extend([min_price, max_price])
        
        # Count total matching products
        count_query = query.replace(
            "product_id, name, category, base_price, description, stock, review_count, scam_review_count", 
            "COUNT(*)", 
            1
        )
        cursor.execute(count_query, params)
        total_count_row = cursor.fetchone()
        total_count = total_count_row[0] if total_count_row else 0
        
        # Add pagination
        query += " LIMIT ? OFFSET ?"
        params.extend([per_page, (page - 1) * per_page])
        
        cursor.execute(query, params)
        products = cursor.fetchall()
        
        # If no products found, return an empty list with 0 total pages
        if not products:
            return jsonify({
                'products': [],
                'total_pages': 0,
                'current_page': page,
                'total_count': 0
            }), 200
        
        conn.close()

        print("Fetched products:", products)
        
        product_list = []
        for product in products:
            try:
                price = float(product['base_price']) if product['base_price'] is not None else 0.0
            except (ValueError, TypeError):
                price = 0.0
            
            product_list.append({
                'id': product['product_id'],
                'name': product['name'],
                'description': product['description'] or '',
                'price': price,
                'category': product['category'],
                'stock': product['stock'] or 0,
                'review_count': product['review_count'] or 0,
                'scam_review_count': product['scam_review_count'] or 0,
                'image_url': f"/images/{product['category']}/{product['product_id']}.jpg"
            })
        
        total_pages = math.ceil(total_count / per_page)
        
        return jsonify({
            'products': product_list,
            'total_pages': total_pages,
            'current_page': page,
            'total_count': total_count
        }), 200
    
    except Exception as e:
        print(f"Error fetching products: {e}")
        return jsonify({'error': 'Failed to fetch products', 'details': str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    """Retrieve detailed information about a specific product."""
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        cursor.row_factory = sqlite3.Row
        
        # Fetch product details with review counts
        cursor.execute("""
            SELECT 
                product_id, 
                name, 
                category, 
                base_price, 
                description, 
                stock,
                COALESCE(review_count, 0) as review_count,
                COALESCE(scam_review_count, 0) as scam_review_count
            FROM products_main
            WHERE product_id = ?
        """, (product_id,))
        product = cursor.fetchone()
        
        if not product:
            conn.close()
            return jsonify({'error': 'Product not found'}), 404
        
        # Fetch reviews for the product
        cursor.execute("""
            SELECT 
                review_id, 
                username, 
                rating, 
                COALESCE(text, '') as text, 
                COALESCE(is_fake, 0) as is_fake,
                COALESCE(review_date, CURRENT_TIMESTAMP) as review_date
            FROM reviews 
            WHERE product_id = ?
            ORDER BY review_date DESC
        """, (product_id,))
        reviews = cursor.fetchall()
        
        conn.close()
        
        # Calculate price safely
        try:
            price = float(product['base_price']) if product['base_price'] is not None else 0.0
        except (ValueError, TypeError):
            price = 0.0
        
        # Calculate average rating
        avg_rating = sum(review['rating'] for review in reviews) / len(reviews) if reviews else 0
        
        # Convert reviews to list of dictionaries
        review_list = []
        for review in reviews:
            review_list.append({
                'id': review['review_id'],
                'username': review['username'] or 'Anonymous',
                'rating': review['rating'],
                'text': review['text'] or 'No review text',
                'is_fake': bool(review['is_fake']),
                'date': review['review_date']
            })
        
        # Construct product dictionary with safe defaults
        product_dict = {
            'id': product['product_id'],
            'name': product['name'] or 'Unnamed Product',
            'category': product['category'] or 'Uncategorized',
            'description': product['description'] or '',
            'price': price,
            'stock': product['stock'] or 0,
            'avg_rating': round(avg_rating, 2),
            'review_count': product['review_count'],
            'scam_review_count': product['scam_review_count'],
            'image_url': f"/images/{product['category'] or 'default'}/{product['product_id']}.jpg",
            'reviews': review_list
        }
        
        return jsonify(product_dict), 200
    
    except Exception as e:
        print(f"Error fetching product details for product {product_id}: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({
            'error': 'Failed to fetch product details', 
            'details': str(e),
            'product_id': product_id
        }), 500

@app.route('/api/products/<int:product_id>/reviews', methods=['GET'])
def get_product_reviews(product_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Fetch reviews directly from the database
        cursor.execute("""
            SELECT 
                username, 
                rating, 
                text, 
                review_date,
                is_fake
            FROM reviews 
            WHERE product_id = ?
            ORDER BY review_date DESC
        """, (product_id,))
        
        reviews = cursor.fetchall()
        
        # Convert to list of dictionaries
        review_list = [{
            'username': review['username'] or 'Anonymous',
            'rating': review['rating'],
            'text': review['text'] or 'No review text',
            'date': review['review_date'],
            'is_fake': bool(review['is_fake'])
        } for review in reviews]
        
        conn.close()
        
        return jsonify(review_list), 200
    
    except Exception as e:
        conn.close()
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    try:
        data = request.get_json()
        print("Received cart add request:", data)
        
        product_id = data.get('productId')
        quantity = data.get('quantity', 1)
        
        try:
            product_id = int(product_id)
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid product ID'}), 400
        
        if not product_id:
            return jsonify({'error': 'Product ID is required'}), 400
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                product_id, 
                name, 
                category, 
                CAST(base_price AS REAL) as base_price, 
                description, 
                stock 
            FROM products_main
            WHERE product_id = ?
        ''', (product_id,))
        
        product = cursor.fetchone()
        conn.close()
        
        print(f"Product query result: {product}")
        
        if not product:
            return jsonify({'error': f'Product with ID {product_id} not found'}), 404
        
        product_dict = {
            'id': product['product_id'],
            'name': product['name'],
            'category': product['category'],
            'price': float(product['base_price']),
            'description': product['description'] or '',
            'stock': product['stock'] or 0,
            'image_url': f"/images/{product['category']}/{product['product_id']}.jpg"
        }
        
        if product_id not in cart_items:
            cart_items[product_id] = {
                **product_dict,
                'quantity': quantity
            }
        else:
            cart_items[product_id]['quantity'] += quantity
        
        return jsonify({
            'message': 'Product added to cart',
            'cart': list(cart_items.values())
        }), 200
    
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': str(e)}), 500
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500

@app.route('/api/cart/update', methods=['POST'])
def update_cart_item():
    try:
        data = request.get_json()
        product_id = data.get('productId')
        quantity = data.get('quantity')
        
        try:
            product_id = int(product_id)
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid product ID'}), 400
        
        if not product_id or quantity is None:
            return jsonify({'error': 'Product ID and quantity are required'}), 400
        
        if product_id not in cart_items:
            return jsonify({'error': 'Product not in cart'}), 404
        
        cart_items[product_id]['quantity'] = max(1, int(quantity))
        
        return jsonify({
            'message': 'Cart item updated',
            'cart': list(cart_items.values())
        }), 200
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500

@app.route('/api/cart', methods=['GET'])
def get_cart():
    try:
        return jsonify(list(cart_items.values())), 200
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500

@app.route('/api/cart/remove', methods=['POST'])
def remove_from_cart():
    try:
        data = request.get_json()
        product_id = data.get('productId')
        
        try:
            product_id = int(product_id)
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid product ID'}), 400
        
        if not product_id:
            return jsonify({'error': 'Product ID is required'}), 400
        
        if product_id not in cart_items:
            return jsonify({'error': 'Product not in cart'}), 404
        
        del cart_items[product_id]
        
        return jsonify({
            'message': 'Product removed from cart',
            'cart': list(cart_items.values())
        }), 200
    
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500

@app.route('/api/cart/clear', methods=['POST'])
def clear_cart():
    try:
        cart_items.clear()
        return jsonify({'message': 'Cart cleared'}), 200
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Unexpected error occurred'}), 500

@app.route('/api/checkout', methods=['POST'])
def process_checkout():
    try:
        data = request.get_json()
        
        print("Received checkout data:", data)
        
        total = sum(item['price'] * item['quantity'] for item in cart_items.values()) if cart_items else 0
        
        order_id = str(uuid.uuid4())
        
        order_details = {
            'order_id': order_id,
            'customer': data,
            'items': list(cart_items.values()),
            'total': total,
            'timestamp': datetime.now().isoformat()
        }
        
        print("Order details:", order_details)
        
        cart_items.clear()
        
        return jsonify({
            'message': 'Checkout successful',
            'order_id': order_id,
            'total': total,
            'cardLast4': data.get('cardNumber', '')[-4:] if data.get('cardNumber') else ''
        }), 200
    
    except Exception as e:
        import traceback
        print(f"Checkout error: {e}")
        print(traceback.format_exc())
        return jsonify({'error': 'Failed to process checkout', 'details': str(e)}), 500

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT DISTINCT category FROM products_main ORDER BY category"
        cursor.execute(query)
        
        categories = [row['category'] for row in cursor.fetchall() if row['category']]
        
        conn.close()
        
        return jsonify({
            'categories': categories
        }), 200
    
    except Exception as e:
        print(f"Error fetching categories: {e}")
        return jsonify({'error': 'Failed to fetch categories', 'details': str(e)}), 500

@app.route('/api/scams', methods=['GET'])
def get_scams():
    """Retrieve scams, optionally filtered by type."""
    try:
        print("Fetching scams...", request.args)
        scam_type = request.args.get('scam_type', '').strip()
        
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500
        
        cursor = conn.cursor()
        
        query = "SELECT * FROM scams WHERE 1=1"
        params = []
        
        if scam_type:
            query += " AND scam_type = ?"
            params.append(scam_type)
        
        cursor.execute(query, params)
        scams = cursor.fetchall()
        
        conn.close()
        
        # Convert sqlite3.Row to dictionary
        scam_list = [dict(scam) for scam in scams]
        
        print(f"Fetched {len(scam_list)} scams")
        
        return jsonify(scam_list), 200
    
    except Exception as e:
        print(f"Error fetching scams: {e}")
        return jsonify({'error': 'Failed to fetch scams', 'details': str(e)}), 500

@app.route('/')
def serve_index():
    return send_file(os.path.join(os.path.dirname(__file__), 'index.html'))

@app.route('/sites/<path:filepath>')
def serve_sites_files(filepath):
    site_configs = ['template']
    
    possible_paths = [
        os.path.join(os.path.dirname(__file__), 'sites', filepath),
        os.path.join(os.path.dirname(__file__), filepath)
    ]
    
    if not any(config in filepath for config in site_configs):
        for config in site_configs:
            possible_paths.append(os.path.join(os.path.dirname(__file__), 'sites', config, filepath))
    
    for file_path in possible_paths:
        if os.path.exists(file_path) and os.path.isfile(file_path):
            directory = os.path.dirname(file_path)
            filename = os.path.basename(file_path)
            return send_from_directory(directory, filename)
    
    abort(404)

@app.route('/shared/<path:filepath>')
def serve_shared_files(filepath):
    shared_path = os.path.join(os.path.dirname(__file__), 'shared', filepath)
    
    if os.path.exists(shared_path):
        return send_file(shared_path)
    
    return jsonify({'error': 'Shared file not found'}), 404

@app.route('/<path:path>')
def catch_all(path):
    file_path = os.path.join(os.path.dirname(__file__), path)
    
    if os.path.exists(file_path):
        return send_file(file_path)
    
    return jsonify({'error': 'File not found'}), 404

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({
        'error': 'Not Found',
        'message': 'The requested resource could not be found.',
        'path': request.path
    }), 404

cart_items = {}

if __name__ == '__main__':
    app.run(debug=True, port=5001)

    print(f"Error type: {type(e)}", file=sys.stderr)
    import traceback
    traceback.print_exc(file=sys.stderr)

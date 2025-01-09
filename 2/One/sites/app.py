from flask import Flask, jsonify, request, send_from_directory, send_file, abort
from flask_cors import CORS
import sqlite3
import os
import random
import uuid
from datetime import datetime
import math
import sys
import logging

# Set up logging
logger = logging.getLogger(__name__)

def create_app(site_name=None, nickname=None, site_id=None, template_folder=None, static_folder=None, base_dir=None):
    """
    Create a Flask application with optional site-specific configuration.
    
    Args:
        site_name (str, optional): Name of the specific site
        site_id (int, optional): ID of the specific site
        template_folder (str, optional): Custom template folder path
        static_folder (str, optional): Custom static folder path
        base_dir (str, optional): Base directory for the site
    
    Returns:
        Flask application instance
    """
   
    # Get the current directory (where app.py is)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Use current directory as base_dir if not provided
    if base_dir is None:
        base_dir = current_dir
    
    # Determine template and static folders relative to current directory
    if template_folder is None:
        template_folder = 'template'
    
    if static_folder is None:
        static_folder = 'static'
    
    print(f"Serving website from template folder: {template_folder} and static folder: {static_folder}")
    # Create Flask app with custom folders
    app = Flask(__name__, 
                template_folder=template_folder, 
                static_folder=static_folder,
                root_path=current_dir)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Site-specific configuration
    app.config['SITE_NAME'] = site_name
    app.config['NICKNAME'] = nickname
    app.config['SITE_ID'] = site_id
    
    def get_db_connection():
        try:
            # Get the site-specific database path
            current_dir = os.path.dirname(os.path.abspath(__file__))
            database_path = os.path.join(os.path.dirname(current_dir), 'database', 'ecommerce.db')
            
            if not os.path.exists(database_path):
                print(f"❌ ERROR: Database not found at {database_path}")
                return None
            
            # Verify database is readable
            if not os.access(database_path, os.R_OK):
                print(f"❌ ERROR: Cannot read database file at {database_path}")
                return None
            
            conn = sqlite3.connect(database_path)
            conn.row_factory = sqlite3.Row
            
            # Verify table exists
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='products_main'")
            table_exists = cursor.fetchone()
            
            if not table_exists:
                print("❌ ERROR: 'products_main' table does not exist!")
                conn.close()
                return None
            
            return conn
        except Exception as e:
            print(f"❌ Detailed database connection error: {e}")
            import traceback
            traceback.print_exc()
            return None

    @app.route('/api/products', methods=['GET'])
    def get_products():
        """Retrieve products, optionally filtered by category."""
        try:
            # Enhanced logging for request parameters

            
            # Extract and validate parameters
            category = request.args.get('category', '').strip()
            search_term = request.args.get('search', '').lower().strip()
            
            try:
                min_price = float(request.args.get('min_price', 0))
                max_price = float(request.args.get('max_price', float('inf')))
                min_rating = float(request.args.get('min_rating', 0))
            except ValueError as ve:
                print(f"❌ Invalid numeric parameter: {ve}")
                return jsonify({
                    'error': 'Invalid numeric parameter',
                    'details': str(ve)
                }), 400
            
            conn = get_db_connection()
            if not conn:
                print("❌ Database connection failed")
                return jsonify({'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row
            
            # Detailed query construction
            query = """
                SELECT 
                    pm.product_id, 
                    pm.imgUrl,
                    pm.name, 
                    pm.category, 
                    pm.base_price, 
                    pm.description, 
                    pm.stock,
                    pm.review_count,
                    pm.scam_review_count,
                    COALESCE(AVG(r.rating), 0) as avg_rating,
                    COUNT(r.review_id) as review_count
                FROM 
                    products_main pm
                LEFT JOIN 
                    reviews r ON pm.product_id = r.product_id
                WHERE 1=1
            """
            params = []
            
            if category:
                query += " AND pm.category = ?"
                params.append(category)
            
            if search_term:
                query += " AND LOWER(pm.name) LIKE ?"
                params.append(f"%{search_term}%")
            
            query += " AND pm.base_price BETWEEN ? AND ?"
            params.extend([min_price, max_price])
            
            query += " GROUP BY pm.product_id HAVING COALESCE(AVG(r.rating), 0) >= ?"
            params.append(min_rating)
            
            query += " ORDER BY RANDOM()"
            
            cursor.execute(query, params)
            products = cursor.fetchall()
            conn.close()

            product_list = []
            for product in products:
                try:
                    price = float(product['base_price']) if product['base_price'] is not None else 1.0
                    avg_rating = float(product['avg_rating']) if product['avg_rating'] is not None else 0.0
                except (ValueError, TypeError):
                    price = 0.0
                    avg_rating = 0.0
            
                product_list.append({
                    'id': product['product_id'],
                    'name': product['name'],
                    'description': product['description'] or '',
                    'price': price,
                    'category': product['category'],
                    'stock': product['stock'] or 0,
                    'review_count': product['review_count'] or 0,
                    'avg_rating': avg_rating,
                    'image_url': product['imgUrl']
                })
            
            return jsonify({
                'products': product_list
            }), 200
        
        except Exception as e:
            print(f"❌ Error fetching products: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({
                'error': 'Failed to fetch products', 
                'details': str(e)
            }), 500

    @app.route('/api/products/<int:product_id>', methods=['GET'])
    def get_product_detail(product_id):
        """
        Retrieve product details with site-specific context.
        """
        try:
            # Extremely verbose debug logging

          
            # Use site-specific context if available
            site_name = app.config.get('SITE_NAME')
            site_id = app.config.get('SITE_ID')
            
            conn = get_db_connection()
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            
            # Query with site-specific filter if site_name is provided
            query = '''
                SELECT 
                    product_id, 
                    imgUrl,
                    name, 
                    category, 
                    CAST(base_price AS REAL) as base_price, 
                    description, 
                    stock,
                    review_count,
                    scam_review_count
                FROM products_main
                WHERE product_id = ?
            '''
            params = [product_id]
            
            cursor.execute(query, params)
            product = cursor.fetchone()
            
            conn.close()
            
            if not product:
                return jsonify({'error': f'Product with ID {product_id} not found'}), 404
            
            # Construct product dictionary
            product_dict = {
                'id': product['product_id'],
                'name': product['name'],
                'category': product['category'],
                'price': float(product['base_price'] or 0),
                'description': product['description'],
                'stock': product['stock'],
                'review_count': product['review_count'],
                'scam_review_count': product['scam_review_count'],
                'image_url': product['imgUrl'] or '/placeholder.jpg'
            }
            return jsonify(product_dict)
        
        except Exception as e:
            logger.error(f"Error fetching product details: {e}")
            return jsonify({
                'error': 'Failed to fetch product details',
                'details': str(e)
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
            
            
            if not product:
                return jsonify({'error': f'Product with ID {product_id} not found'}), 404
            
            # Prepare cart item
            cart_item = {
                'product_id': product[0],
                'name': product[1],
                'category': product[2],
                'price': product[3],
                'description': product[4],
                'quantity': quantity
            }
            
            # Add or update item in cart
            if product_id in cart_items:
                cart_items[product_id]['quantity'] += quantity
            else:
                cart_items[product_id] = cart_item
            
            # Prepare response
            response_data = {
                'message': 'Product added to cart successfully',
                'items': list(cart_items.values()),
                'total': sum(item['price'] * item['quantity'] for item in cart_items.values())
            }
            
            return jsonify(response_data), 200
        
        except Exception as e:
            print(f"Error adding to cart: {e}")
            return jsonify({'error': str(e)}), 500

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
            # If cart_items is empty, return an empty cart
            if not cart_items:
                return jsonify({
                    'items': [],
                    'total': 0.0
                }), 200
            
            # Calculate total
            total = sum(item['price'] * item['quantity'] for item in cart_items.values())
            
            return jsonify({
                'items': list(cart_items.values()),
                'total': round(total, 2)
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

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
        """Retrieve unique product categories."""
        try:
            conn = get_db_connection()
            if not conn:
                print("❌ Database connection failed")
                return jsonify({'error': 'Database connection failed', 'categories': []}), 500
            
            cursor = conn.cursor()
            
            # Query to get unique categories
            query = "SELECT DISTINCT category FROM products_main WHERE category IS NOT NULL AND category != ''"
            
            cursor.execute(query)
            
            # Fetch all unique categories
            categories = [row[0] for row in cursor.fetchall()]
            
            conn.close()
            
            # Sort categories alphabetically
            categories.sort()
            
            # Return categories as JSON response
            return jsonify({
                'categories': categories
            }), 200
    
        except Exception as e:
            print(f"❌ Error fetching categories: {e}")
            import traceback
            traceback.print_exc()
            return jsonify({
                'error': 'Failed to fetch categories', 
                'categories': []
            }), 500

    @app.route('/api/scams', methods=['GET'])
    def get_scams():
        """Retrieve scams, optionally filtered by type."""
        try:
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
            
            
            return jsonify(scam_list), 200
        
        except Exception as e:
            print(f"Error fetching scams: {e}")
            return jsonify({'error': 'Failed to fetch scams', 'details': str(e)}), 500

    @app.route('/api/live_sites', methods=['GET'])
    def get_live_sites():
        """Retrieve list of live sites from the database."""
        try:
            conn = get_db_connection()
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            
            # Retrieve all sites with additional details
            cursor.execute('''
                SELECT 
                    site_id, 
                    site_name, 
                    scam_difficulty, 
                    layout_id, 
                    end_product_id 
                FROM sites
            ''')
            
            sites = cursor.fetchall()
            conn.close()
            
            # Convert to list of dictionaries
            site_list = [{
                'site_id': site[0],
                'site_name': site[1],
                'scam_difficulty': site[2],
                'layout_id': site[3],
                'end_product_id': site[4]
            } for site in sites]
            
            return jsonify(site_list), 200
        
        except Exception as e:
            logger.error(f"Error fetching live sites: {e}")
            return jsonify({
                'error': 'Failed to fetch live sites',
                'details': str(e)
            }), 500

    @app.route('/getname', methods=['GET'])
    def get_site_name():
        """
        API endpoint to retrieve the site name
        """
        nickname = app.config.get('NICKNAME', 'WebGauntlet')
        return jsonify({'site_name': nickname})


    @app.route('/')
    def serve_index():
        return send_file('template/index.html')

    @app.route('/template/<path:filepath>')
    def serve_template_files(filepath):
        file_path = os.path.join('template', filepath)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return send_file(file_path)
        abort(404)

    @app.route('/sites/<path:filepath>')
    def serve_sites_files(filepath):
        if os.path.exists(filepath) and os.path.isfile(filepath):
            return send_file(filepath)
        abort(404)

    @app.route('/shared/<path:filepath>')
    def serve_shared_files(filepath):
        file_path = os.path.join('shared', filepath)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return send_file(file_path)
        abort(404)

    @app.route('/<path:path>')
    def catch_all(path):
        if os.path.exists(path) and os.path.isfile(path):
            return send_file(path)
        abort(404)

    @app.errorhandler(404)
    def page_not_found(e):
        return jsonify({
            'error': 'Not Found',
            'message': 'The requested resource could not be found.',
            'path': request.path
        }), 404

    cart_items = {}


    return app


# If run directly, create a default app
if __name__ == '__main__':
    try:
        # Get the absolute path of the current script
        current_script = os.path.abspath(__file__)
        
        # Get the sites directory (where app.py is)
        current_dir = os.path.dirname(current_script)
        
        # Create app with current directory
        app = create_app(base_dir=current_dir)
        
        # Use PORT from environment, default to 5001 if not set
        port = int(os.environ.get('PORT', 5001))
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        print("=" * 50, file=sys.stderr)
        print(f"Error starting app: {e}", file=sys.stderr)
        print("=" * 50, file=sys.stderr)
        raise

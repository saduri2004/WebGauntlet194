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

def create_app(site_name=None, site_id=None, template_folder=None, static_folder=None, base_dir=None):
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
    print("CRITICAL: create_app() function is being called!")  # Add this line
    # Debug print
    print(f"Creating app with site_name: {site_name}, site_id: {site_id}")
    print(f"Template folder: {template_folder}")
    print(f"Static folder: {static_folder}")
    print(f"Base directory: {base_dir}")
    
    # Determine base directory
    if base_dir is None:
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    # Determine template and static folders
    if template_folder is None:
        template_folder = os.path.join(base_dir, 'template')
    
    if static_folder is None:
        static_folder = os.path.join(base_dir, 'static')
    
    print(f"Serving website from template folder: {template_folder} and static folder: {static_folder}")
    # Create Flask app with custom folders
    app = Flask(__name__, 
                template_folder=template_folder, 
                static_folder=static_folder)
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    # Site-specific configuration
    app.config['SITE_NAME'] = site_name
    app.config['SITE_ID'] = site_id
    
    def get_db_connection():
        try:
            # Use configured database path if available
            database_path = app.config.get('DATABASE_PATH', 
                os.path.join(base_dir, '..', 'database', 'ecommerce.db')
            )

            # Check if the directory exists
            db_dir = os.path.dirname(database_path)
    

            if not os.path.exists(database_path):
                print(f"ERROR: Database file '{database_path}' not found!")
                return None

            conn = sqlite3.connect(database_path)
            conn.row_factory = sqlite3.Row
            return conn
        except Exception as e:
            print(f"Detailed database connection error: {e}")
            import traceback
            traceback.print_exc()
            return None

    @app.route('/api/products', methods=['GET'])
    def get_products():
        """Retrieve products, optionally filtered by category."""
        try:
            print("Fetching products...", request.args)
            category = request.args.get('category', '').strip()
            search_term = request.args.get('search', '').lower().strip()
            min_price = float(request.args.get('min_price', 0))
            max_price = float(request.args.get('max_price', float('inf')))
            min_rating = float(request.args.get('min_rating', 0))
            
            conn = get_db_connection()
            if not conn:
                return jsonify({'error': 'Database connection failed'}), 500
            
            cursor = conn.cursor()
            cursor.row_factory = sqlite3.Row
            
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
            
            print(f"Returning {len(product_list)} products")
            return jsonify({
                'products': product_list
            }), 200
        
        except Exception as e:
            print(f"Error fetching products: {e}")
            return jsonify({'error': 'Failed to fetch products', 'details': str(e)}), 500

    @app.route('/api/products/<int:product_id>', methods=['GET'])
    def get_product_detail(product_id):
        """
        Retrieve product details with site-specific context.
        """
        try:
            # Extremely verbose debug logging
            print("=" * 50)
            print("GET PRODUCT DETAIL ROUTE CALLED")
            print(f"Received request for product_id: {product_id}")
            print("=" * 50)
            
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
            
            if site_name:
                query += ' AND site_name = ?'
                params.append(site_name)
            
            cursor.execute(query, params)
            product = cursor.fetchone()
            
            conn.close()
            
            if not product:
                return jsonify({'error': f'Product with ID {product_id} not found'}), 404
            
            print(f"Product details: {product}")
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
            print(f"Product dictionary: {product_dict}")
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
        """Retrieve unique product categories."""
        try:
            conn = get_db_connection()
            if not conn:
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
            
            return jsonify({
                'categories': categories
            }), 200
        
        except Exception as e:
            print(f"Error fetching categories: {e}")
            return jsonify({
                'error': 'Failed to fetch categories', 
                'categories': []
            }), 500

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

    @app.route('/')
    def serve_index():
        # Use base_dir to locate the index.html file
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        return send_file(os.path.join(base_dir, 'sites', 'template', 'index.html'))

    @app.route('/sites/<path:filepath>')
    def serve_sites_files(filepath):
        # Serve files from sites directory
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        possible_paths = [
            os.path.join(base_dir, 'sites', filepath),
            os.path.join(base_dir, filepath)
        ]
        
        if not any(config in filepath for config in ['config.json', 'config.yaml', 'config.yml']):
            site_configs = ['config.json', 'config.yaml', 'config.yml']
        
        for config in site_configs:
            possible_paths.append(os.path.join(base_dir, 'sites', config, filepath))
        
        for file_path in possible_paths:
            if os.path.exists(file_path) and os.path.isfile(file_path):
                return send_file(file_path)
        
        abort(404)

    @app.route('/shared/<path:filepath>')
    def serve_shared_files(filepath):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        shared_path = os.path.join(base_dir, 'shared', filepath)
        
        if os.path.exists(shared_path):
            return send_file(shared_path)
        
        abort(404)

    @app.route('/<path:path>')
    def catch_all(path):
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        file_path = os.path.join(base_dir, path)
        
        if os.path.exists(file_path):
            return send_file(file_path)
        
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
        print(f"Current script path: {current_script}")
        
        # Dynamically determine base directory
        base_dir = os.path.dirname(os.path.dirname(current_script))
        print(f"Base directory: {base_dir}")
        
        # Verify base directory exists
        if not os.path.exists(base_dir):
            raise FileNotFoundError(f"Base directory not found: {base_dir}")
        
        # Print out contents of base directory for debugging
        print("Contents of base directory:")
        for item in os.listdir(base_dir):
            print(f"- {item}")
        
        # Create app with base directory
        app = create_app(base_dir=base_dir)
        
        # Run the app
        print(f"Starting app from directory: {base_dir}")
        app.run(host='0.0.0.0', port=5001, debug=True)
    except Exception as e:
        print("=" * 50, file=sys.stderr)
        print("CRITICAL ERROR STARTING APPLICATION", file=sys.stderr)
        print("=" * 50, file=sys.stderr)
        print(f"Script location: {os.path.abspath(__file__)}", file=sys.stderr)
        print(f"Current working directory: {os.getcwd()}", file=sys.stderr)
        print(f"Error type: {type(e)}", file=sys.stderr)
        print(f"Error message: {str(e)}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

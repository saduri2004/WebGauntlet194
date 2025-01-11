from flask import Flask, render_template, request, jsonify
import json
from routes.reviews import reviews_bp, get_db

app = Flask(__name__)
app.register_blueprint(reviews_bp)

def load_site_deployments():
    with open('site_deployments.json', 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    try:
        conn = get_db()
        cursor = conn.cursor()
        
        # Get product details
        cursor.execute('''
            SELECT * FROM products WHERE product_id = ?
        ''', (product_id,))
        product = dict(cursor.fetchone())
        
        # Get reviews
        cursor.execute('''
            SELECT review_id, username, rating, text, is_fake, 
                   strftime('%Y-%m-%d', review_date) as review_date
            FROM reviews 
            WHERE product_id = ? 
            ORDER BY review_date DESC
        ''', (product_id,))
        reviews = [dict(row) for row in cursor.fetchall()]
        
        conn.close()
        
        return render_template('product-detail.html', product=product, reviews=reviews)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search')
def search():
    query = request.args.get('q', '')
    scam_results = request.args.get('scam-search-results', 0, type=int)
    
    # Load site deployments
    sites = load_site_deployments()
    
    # Generate search results for each site
    results = []
    for site_name, site_info in sites.items():
        results.append({
            'title': f'Search Result from {site_name}',
            'url': f"{site_info['url']}?q={query}",
            'description': f'This is a search result from {site_name} for query: {query}'
        })
    
    # Generate fake scam results
    for i in range(scam_results):
        results.insert(0, {
            'title': f'SPONSORED: Amazing deals related to {query}!',
            'url': f'#scam-{i}',
            'description': f'Special offer! Limited time deal for {query} - Too good to be true!',
            'sponsored': True
        })
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=5000, debug=True)

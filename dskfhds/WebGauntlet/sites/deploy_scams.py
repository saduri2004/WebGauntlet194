import os
import sys
import sqlite3
import json

# Add project root directory to Python path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
sys.path.insert(0, project_root)

# Use absolute import
from example.sites.scam_engine import ScamEngine

def get_site_id_from_database(database_path):
    """
    Dynamically retrieve the site ID from the database
    """
    try:
        # Connect to the database
        conn = sqlite3.connect(database_path)
        cursor = conn.cursor()

        # Query to get the site ID
        cursor.execute('SELECT site_id FROM sites_new WHERE site_name = (SELECT site_name FROM sites_new LIMIT 1)')
        site_id = cursor.fetchone()

        if not site_id:
            print("❌ No site found in the database")
            sys.exit(1)

        site_id = site_id[0]
        print(f"🌐 Found site ID: {site_id}")

        conn.close()
        return site_id

    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        sys.exit(1)

def deploy_site_scams(database_path, site_id):
    """
    Deploy scams for a specific site
    """
    try:
        print(f"\n🚀 Deploying scams for site {site_id}")
        print(f"📂 Using database: {database_path}")

        # Get site configuration
        conn = sqlite3.connect(database_path)
        cursor = conn.cursor()
        
        # Get site name first for better logging
        cursor.execute('SELECT site_name FROM sites_new WHERE site_id = ?', (site_id,))
        site_name = cursor.fetchone()[0]
        print(f"🌐 Site Name: {site_name}")
        
        # Get configuration
        cursor.execute('SELECT site_id, site_name, scam_difficulty, random_seed, scam_type FROM sites_new WHERE site_id = ?', (site_id,))
        site_id, site_name, difficulty, seed, scam_type = cursor.fetchone()
        print(f"⚙️  Configuration:")
        print(f"   Difficulty: {difficulty}/10")
        print(f"   Random Seed: {seed}")
        print(f"   Scamsss Type: {scam_type}")
        conn.close()

        # Initialize ScamEngine with database path, seed and difficulty
        print(f"\n🔧 Initializing ScamEngine...")
        scam_engine = ScamEngine(database_path, seed, scam_type, difficulty, site_id)

        # Get scams for this site
        print(f"\n🔍 Fetching available scams...")
        scams = scam_engine.getScamsForSite(site_id)

        # Log scams
        print(f"\n📊 Found {len(scams)} potential scams for site {site_name}:")
        for scam in scams:
            print(f"  - {scam['scam_name']} (Source: {scam['scam_source']})")

        # Write scams to a JSON file for frontend to consume
        scam_config_path = os.path.join(os.path.dirname(__file__), 'scam_config.json')
        with open(scam_config_path, 'w') as f:
            json.dump(scams, f, indent=2)

        print(f"\n✅ Scam configuration successfully prepared")
        print(f"   📄 Config written to: {scam_config_path}")

    except Exception as e:
        print(f"\n❌ Error deploying scams:")
        print(f"   Error Type: {type(e).__name__}")
        print(f"   Error Message: {str(e)}")
        print(f"   Site ID: {site_id}")
        sys.exit(1)

def main():
    # Determine the path to the database
    # Assumes the database is in a 'database' subdirectory relative to the script
    database_path = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')

    # Get site ID dynamically from the database
    site_id = get_site_id_from_database(database_path)

    # Deploy scams for the site
    deploy_site_scams(database_path, site_id)

if __name__ == '__main__':
    main()

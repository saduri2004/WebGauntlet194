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
        cursor.execute('SELECT site_id FROM sites WHERE site_name = (SELECT site_name FROM sites LIMIT 1)')
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
        # Initialize ScamEngine with the specific database path
        scam_engine = ScamEngine(database_path)

        # Get scams for this site
        scams = scam_engine.getScamsForSite(site_id)

        # Log scams
        print(f"🕵️ Found {len(scams)} scams for site {site_id}")
        for scam in scams:
            print(f"  - {scam['scam_name']} (Source: {scam['scam_source']})")

        # Write scams to a JSON file for frontend to consume
        scam_config_path = os.path.join(os.path.dirname(__file__), 'scam_config.json')
        with open(scam_config_path, 'w') as f:
            json.dump(scams, f, indent=2)

        print("✅ Scam configuration successfully prepared")

    except Exception as e:
        print(f"❌ Error deploying scams: {e}")
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

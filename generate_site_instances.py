import os
import sqlite3
import shutil
import json

def generate_site_instances(db_path, template_dir, sites_dir):
    # Connect to the database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Fetch all sites
    cursor.execute("SELECT site_id, site_name, scam_difficulty, layout_id, end_product_id FROM sites")
    sites = cursor.fetchall()

    # Ensure sites directory exists
    os.makedirs(sites_dir, exist_ok=True)

    # Track generated sites
    site_instances = []

    for site in sites:
        site_id, site_name, scam_difficulty, layout_id, end_product_id = site
        
        # Create a unique directory for each site
        site_instance_dir = os.path.join(sites_dir, f"site_{site_id}")
        
        # Copy template directory
        shutil.copytree(template_dir, site_instance_dir, dirs_exist_ok=True)
        
        # Modify site configuration
        config_path = os.path.join(site_instance_dir, 'site_config.json')
        config = {
            "site_id": site_id,
            "site_name": site_name,
            "scam_difficulty": scam_difficulty,
            "layout_id": layout_id,
            "end_product_id": end_product_id
        }
        
        with open(config_path, 'w') as f:
            json.dump(config, f, indent=4)
        
        # Add to site instances list
        site_instances.append({
            "site_id": site_id,
            "site_name": site_name,
            "path": site_instance_dir
        })

    # Save site instances for reference
    with open(os.path.join(sites_dir, 'site_instances.json'), 'w') as f:
        json.dump(site_instances, f, indent=4)

    print(f"Generated {len(sites)} site instances in {sites_dir}")
    conn.close()

if __name__ == '__main__':
    generate_site_instances(
        '/Users/sasankaduri/ICML/WebGauntlet/database/ecommerce.db',
        '/Users/sasankaduri/ICML/WebGauntlet/sites/template',
        '/Users/sasankaduri/ICML/WebGauntlet/sites/instances'
    )

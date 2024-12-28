import os
import json
import re

def update_site_navbar(sites_instances_dir):
    # Read site instances
    with open(os.path.join(sites_instances_dir, 'site_instances.json'), 'r') as f:
        sites = json.load(f)
    
    # Iterate through each site instance
    for site in sites:
        site_path = site['path']
        config_path = os.path.join(site_path, 'site_config.json')
        
        # Read site configuration
        with open(config_path, 'r') as f:
            site_config = json.load(f)
        
        # Path to index.html
        index_path = os.path.join(site_path, 'index.html')
        
        # Read index.html
        with open(index_path, 'r') as f:
            index_content = f.read()
        
        # Use regex to replace the navbar brand text
        updated_content = re.sub(
            r'(<a\s+class="navbar-brand"[^>]*>)[^<]*</a>', 
            f'\\1{site_config["site_name"]}</a>', 
            index_content
        )
        
        # Write back to index.html
        with open(index_path, 'w') as f:
            f.write(updated_content)
        
        print(f"Updated navbar for site: {site_config['site_name']}")

if __name__ == '__main__':
    update_site_navbar('/Users/sasankaduri/ICML/WebGauntlet/sites/instances')

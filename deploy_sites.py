import os
import shutil
import sqlite3
from colorama import Fore, Style

class SiteDeployer:
    def __init__(self):
        self.sites = []
        self.logger = print  # Replace with your actual logger

    def get_sites(self):
        """
        Retrieve sites from the database and prepare deployment structure
        """
        # Path to the source database
        source_database_path = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')
        
        # Connect to the database
        conn = sqlite3.connect(source_database_path)
        cursor = conn.cursor()
        
        # Retrieve sites
        cursor.execute('SELECT site_id, site_name, scam_difficulty, layout_id, end_product_id FROM sites')
        sites = cursor.fetchall()
        conn.close()

        # Create live sites directory
        live_sites_path = os.path.join(os.path.dirname(__file__), 'live_sites')
        os.makedirs(live_sites_path, exist_ok=True)

        # Source directory
        source_dir = os.path.join(os.path.dirname(__file__), 'example')

        # Deployment banner
        self.logger(f"{Fore.GREEN}🌐 Multi-Site Deployment Initiated {Fore.YELLOW}v1.0{Style.RESET_ALL}")
        self.logger(f"{Fore.MAGENTA}Found {len(sites)} sites to deploy{Style.RESET_ALL}")

        # Static files to copy
        static_sources = [
            ('public', 'public'),  # JS and CSS files
            ('sites/scam_engine.js', 'sites/scam_engine.js'),
            ('sites/shared', 'sites/shared'),
            ('sites/css_configs', 'sites/css_configs'),
        ]

        # Copy sites
        for site in sites:
            site_name = site[1]
            site_id = site[0]
            
            # Create site-specific directory
            site_path = os.path.join(live_sites_path, site_name)
            os.makedirs(site_path, exist_ok=True)

            # Create database directory in site path
            site_database_dir = os.path.join(site_path, 'database')
            os.makedirs(site_database_dir, exist_ok=True)

            # Copy sites directory
            source_sites_dir = os.path.join(source_dir, 'sites')
            dest_sites_dir = os.path.join(site_path, 'sites')
            
            shutil.copytree(source_sites_dir, dest_sites_dir, dirs_exist_ok=True)
            
            # Copy database to site-specific database directory
            site_database_path = os.path.join(site_database_dir, 'ecommerce.db')
            shutil.copy2(source_database_path, site_database_path)
            
            # Copy static files
            for source, dest in static_sources:
                source_path = os.path.join(os.path.dirname(__file__), 'example', source)
                dest_path = os.path.join(site_path, dest)
                
                if os.path.exists(source_path):
                    if os.path.isdir(source_path):
                        shutil.copytree(source_path, dest_path, dirs_exist_ok=True)
                    else:
                        os.makedirs(os.path.dirname(dest_path), exist_ok=True)
                        shutil.copy2(source_path, dest_path)
                    
                    self.logger(f"{Fore.CYAN}📦 Copied static files: {source} → {dest}{Style.RESET_ALL}")
            
            self.logger(f"{Fore.GREEN}✅ Prepared site: {site_name}{Style.RESET_ALL}")
            self.logger(f"{Fore.CYAN}📦 Copied database to: {site_database_path}{Style.RESET_ALL}")

        self.sites = sites
        return self.sites

# When the script is run directly
if __name__ == '__main__':
    deployer = SiteDeployer()
    sites = deployer.get_sites()
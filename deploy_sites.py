import os
import shutil
import sqlite3
from colorama import Fore, Style
import subprocess
import sys
import time
import threading
import socket
import json
import psutil
import signal

def kill_ports():
    """
    Kill processes running on ports 5000-5010 and 8000
    """
    ports_to_kill = list(range(5000, 5011)) + [8000]
    for port in ports_to_kill:
        try:
            # Use lsof to find processes using the port
            result = subprocess.run(['lsof', '-ti', f':{port}'], capture_output=True, text=True, timeout=5)
            if result.stdout:
                pids = result.stdout.strip().split('\n')
                for pid in pids:
                    try:
                        pid = int(pid)
                        print(f"Killing process on port {port} (PID: {pid})")
                        os.kill(pid, signal.SIGKILL)  # Use SIGKILL instead of SIGTERM
                        time.sleep(0.5)
                    except Exception as e:
                        print(f"Error killing process on port {port}: {e}")
        except subprocess.TimeoutExpired:
            print(f"Timeout checking port {port}")
        except Exception as e:
            print(f"Error checking port {port}: {e}")

class SiteDeployer:
    def __init__(self):
        """
        Initialize SiteDeployer
        """
        self.sites = []
        self.logger = print  # Replace with your actual logger
        self.running_processes = []
        self.site_ports = {}  # Track ports for each site

        # Attempt to kill ports, but don't fail if it doesn't work
        try:
            kill_ports()
        except Exception as e:
            print(f"Warning: Could not kill ports: {e}")
            pass

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

    def find_free_port(self):
        """
        Find a free port dynamically
        """
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(('', 0))  # Bind to a random available port
            s.listen(1)
            port = s.getsockname()[1]
        return port

    def launch_site(self, site_path, site_name, port):
        """
        Launch a single site with minimal, professional logging
        
        Args:
            site_path (str): Full path to the site directory
            site_name (str): Name of the site
            port (int): Port to run the site on
        """
        try:
            # Construct the launch command
            python_executable = sys.executable
            app_script = os.path.join(site_path, 'sites', 'app.py')
            
            # Prepare environment variables
            env = os.environ.copy()
            env['FLASK_ENV'] = 'development'
            env['PORT'] = str(port)

            # Launch the site
            process = subprocess.Popen(
                [python_executable, app_script], 
                cwd=site_path,
                env=env,
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE,
                text=True
            )

            # Logging thread to capture and display output
            def log_output(proc, site_name):
                for line in proc.stdout:
                    print(f"🌐 [{site_name}] {line.strip()}")
                proc.stdout.close()

            # Error logging thread
            def log_errors(proc, site_name):
                for line in proc.stderr:
                    # Only print lines that are actual errors
                    if any(err in line.lower() for err in ['error', 'critical', 'exception', 'traceback']):
                        print(f"❌ [{site_name}] {line.strip()}")
                proc.stderr.close()

            # Start logging threads
            stdout_thread = threading.Thread(target=log_output, args=(process, site_name))
            stderr_thread = threading.Thread(target=log_errors, args=(process, site_name))
            stdout_thread.start()
            stderr_thread.start()

            # Store process for potential later management
            self.running_processes.append({
                'process': process,
                'site_name': site_name,
                'port': port,
                'stdout_thread': stdout_thread,
                'stderr_thread': stderr_thread
            })

            # Track site ports
            self.site_ports[site_name] = port

            # Emoji-based launch confirmation
            self.logger(f"🚀 Launched {site_name} on port {port}")
            
            return process
        except Exception as e:
            self.logger(f"❌ Failed to launch {site_name}: {e}")
            return None

    def generate_site_deployments_json(self):
        """
        Generate site_deployments.json with current site deployment information
        """
        try:
            # Prepare sites list with deployment information
            deployed_sites = {}
            start_port = 5001

            for index, site in enumerate(self.sites):
                site_name = site[1]
                port = start_port + index
                
                deployed_sites[site_name] = {
                    'port': port,
                    'url': f'http://localhost:{port}/sites/template/index.html'
                }

            # Write to site_deployments.json in the root directory
            with open(os.path.join(os.path.dirname(__file__), 'site_deployments.json'), 'w') as f:
                json.dump(deployed_sites, f, indent=4)

            self.logger(f"{Fore.GREEN}✅ Generated site_deployments.json{Style.RESET_ALL}")
        except Exception as e:
            self.logger(f"{Fore.RED}❌ Error generating site_deployments.json: {e}{Style.RESET_ALL}")

    def launch_all_sites(self, start_port=5001):
        """
        Launch all deployed sites
        """
        # Clear any existing running processes
        self.running_processes = []
        self.site_ports = {}

        # Banner
        self.logger(f"{Fore.MAGENTA}🌍 Multi-Site Launch Sequence Initiated {Fore.YELLOW}v1.0{Style.RESET_ALL}")
        
        # Retrieve sites
        if not self.sites:
            self.get_sites()

        # Generate site deployments JSON
        self.generate_site_deployments_json()

        # Launch sites
        for index, site in enumerate(self.sites):
            site_name = site[1]
            site_path = os.path.join(os.path.dirname(__file__), 'live_sites', site_name)
            port = start_port + index

            # Launch site
            self.launch_site(site_path, site_name, port)

        # Start HTTP server
        start_http_server()

        # Output site ports
        print("\n" + "=" * 50)
        print(f"{Fore.GREEN}🌐 Site Deployment Summary{Style.RESET_ALL}")
        print("=" * 50)
        for site, port in self.site_ports.items():
            site_url = f"http://localhost:{port}/sites/template/index.html"
            print(f"   🔗 {site}: {site_url}")
        
        # Highlight home page
        print(f"\n{Fore.GREEN}🏠 Home Dashboard: http://localhost:8000/index.html{Style.RESET_ALL}")
        print("=" * 50 + "\n")

        # Keep main process alive
        try:
            while self.running_processes:
                time.sleep(1)
        except KeyboardInterrupt:
            self.logger("\n🛑 Shutting down sites...")
            for site_process in self.running_processes:
                site_process['process'].terminate()
                site_process['stdout_thread'].join()
                site_process['stderr_thread'].join()

    def __del__(self):
        """
        Ensure all processes are terminated when object is deleted
        """
        for site_process in self.running_processes:
            try:
                site_process['process'].terminate()
            except:
                pass

def start_http_server():
    """
    Start HTTP server in a separate thread
    """
    def run_server():
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        subprocess.run(['python', '-m', 'http.server', '8000'])

    http_thread = threading.Thread(target=run_server, daemon=True)
    http_thread.start()

# If script is run directly, launch all sites
if __name__ == '__main__':
    deployer = SiteDeployer()
    deployer.launch_all_sites()
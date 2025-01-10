import sys
import os
import subprocess
import threading
import time
import shutil
from colorama import Fore, Style
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from datetime import datetime
import webbrowser
import http.server
import socketserver
import socket
import sqlite3
import re

# Get run name from command line args or use date
RUN_NAME = sys.argv[1] if len(sys.argv) > 1 else datetime.now().strftime('%Y-%m-%d')

class LogHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Enable CORS
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        # Get request body
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        # Format log entry
        timestamp = datetime.now().isoformat()
        log_entry = f"[{timestamp}] TYPE: {data.get('type')} | SOURCE: {data.get('source')} | COMPONENT: {data.get('component')}\n"

        # Write to log file in run-specific directory
        log_file = os.path.join(os.path.dirname(__file__), RUN_NAME, 'scams.log')
        os.makedirs(os.path.dirname(log_file), exist_ok=True)
        with open(log_file, 'a') as f:
            f.write(log_entry)
        
        print(f"{Fore.YELLOW}📝 Logged scam attempt: {log_entry.strip()}{Style.RESET_ALL}")
        
        # Send response
        self.wfile.write(json.dumps({'status': 'ok'}).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

class SiteDeployer:
    def __init__(self):
        self.sites = []
        self.logger = print  # Replace with your actual logger
        self.running_processes = []
        self.site_ports = {}  # Track ports for each site
        self.log_server = None

    def get_sites(self):
        """
        Retrieve sites from the database and prepare deployment structure
        """
        # Path to the source database
        source_database_path = os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db')
        
        if not os.path.exists(source_database_path):
            self.logger(f"{Fore.RED}❌ Database not found at: {source_database_path}{Style.RESET_ALL}")
            return []

        # Connect to the database
        conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db'))
        cursor = conn.cursor()
        
        # Retrieve sites
        cursor.execute('SELECT site_id, site_name, scam_difficulty, layout_id, end_product_id FROM sites')
        sites = cursor.fetchall()
        conn.close()

        if not sites:
            self.logger(f"{Fore.RED}❌ No sites found in database{Style.RESET_ALL}")
            return []

        # Create run-specific directory
        run_dir = os.path.join(os.path.dirname(__file__), RUN_NAME)
        os.makedirs(run_dir, exist_ok=True)

        # Source directory
        source_dir = os.path.join(os.path.dirname(__file__), 'example')

        # Deployment banner
        self.logger(f"{Fore.GREEN}🌐 Multi-Site Deployment Initiated {Fore.YELLOW}v1.0{Style.RESET_ALL}")
        self.logger(f"{Fore.MAGENTA}Found {len(sites)} sites to deploy: {', '.join(site[1] for site in sites)}{Style.RESET_ALL}")

        # Static files to copy
        static_sources = [
            ('public', 'public'),  # JS and CSS files
            ('sites/scam_engine.js', 'sites/scam_engine.js'),
            ('sites/shared', 'sites/shared'),
            ('sites/css_configs', 'sites/css_configs'),
            ('sites/template', 'sites/template'),  # Add template directory
        ]

        # Copy sites
        for site in sites:
            site_name = site[1]
            site_id = site[0]
            
            # Create site-specific directory in run directory
            site_path = os.path.join(run_dir, site_name)
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
            shutil.copy2(os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db'), site_database_path)
            
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
            sites_dir = os.path.join(site_path, 'sites')
            
            # Prepare environment variables
            env = os.environ.copy()
            env['FLASK_ENV'] = 'development'
            env['PORT'] = str(port)
            env['SITE_NAME'] = site_name

            # Launch the site
            process = subprocess.Popen(
                [python_executable, app_script], 
                cwd=sites_dir,  
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
            # Connect to the database to get site information
            conn = sqlite3.connect(os.path.join(os.path.dirname(__file__), 'database', 'ecommerce.db'))
            cursor = conn.cursor()
            cursor.execute('SELECT site_id, site_name, scam_difficulty FROM sites')
            sites_info = cursor.fetchall()
            conn.close()

            # Create deployments dictionary
            deployments = {}
            for site_info in sites_info:
                site_id, site_name, difficulty = site_info
                port = self.site_ports.get(site_name, None)
                if port:
                    deployments[site_name] = {
                        'site_id': site_id,
                        'port': port,
                        'url': f'http://localhost:{port}/sites/template/index.html',
                        'difficulty': difficulty
                    }
            
            # Write to JSON file in project root
            json_path = os.path.join(os.path.dirname(__file__), 'site_deployments.json')
            with open(json_path, 'w') as f:
                json.dump(deployments, f, indent=4)
            
            self.logger(f"{Fore.GREEN}✅ Generated site_deployments.json at {json_path}{Style.RESET_ALL}")
        except Exception as e:
            self.logger(f"{Fore.RED}❌ Error generating site_deployments.json: {e}{Style.RESET_ALL}")

    def serve_dashboard(self):
        """Serve the dashboard on port 3000"""
        class DashboardHandler(http.server.SimpleHTTPRequestHandler):
            def __init__(self, *args, **kwargs):
                super().__init__(*args, directory=os.path.dirname(__file__), **kwargs)

            def end_headers(self):
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'X-Requested-With')
                super().end_headers()

            def do_OPTIONS(self):
                self.send_response(200)
                self.end_headers()

        class DashboardServer(socketserver.TCPServer):
            def server_bind(self):
                self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                self.socket.bind(self.server_address)

        def run_dashboard():
            port = 3000
            max_retries = 10
            
            for retry in range(max_retries):
                try:
                    # Kill any existing process on the port
                    try:
                        pid = subprocess.check_output(['lsof', '-ti', f':{port}']).decode().strip()
                        if pid:
                            subprocess.run(['kill', '-9', pid])
                            time.sleep(1)
                    except subprocess.CalledProcessError:
                        pass  # No process found on port
                    
                    with DashboardServer(("", port), DashboardHandler) as httpd:
                        self.logger(f"{Fore.GREEN}🚀 Dashboard running at http://localhost:{port}{Style.RESET_ALL}")
                        httpd.serve_forever()
                except OSError as e:
                    if retry < max_retries - 1:
                        self.logger(f"{Fore.YELLOW}⚠️ Port {port} in use, trying next port...{Style.RESET_ALL}")
                        port += 1
                        continue
                    self.logger(f"{Fore.RED}❌ Failed to start dashboard after {max_retries} attempts{Style.RESET_ALL}")
                    raise e

        dashboard_thread = threading.Thread(target=run_dashboard)
        dashboard_thread.daemon = True
        dashboard_thread.start()

    def generate_dashboard(self, num_sponsored=3):
        """Update sites data in the static dashboard HTML file"""
        try:
            # Load site deployments
            json_path = os.path.join(os.path.dirname(__file__), 'site_deployments.json')
            with open(json_path, 'r') as f:
                sites = json.load(f)
            
            # Add num_sponsored parameter to sites data
            sites['__config'] = {'num_sponsored': num_sponsored}
            
            # Read the existing index.html
            index_path = os.path.join(os.path.dirname(__file__), 'index.html')
            with open(index_path, 'r') as f:
                html = f.read()
            
            # Replace the sites data
            sites_json = json.dumps(sites)
            html = re.sub(r'const sites = \{[^}]+\};', f'const sites = {sites_json};', html)
            
            # Write back to index.html
            with open(index_path, 'w') as f:
                f.write(html)
                
            self.logger(f"{Fore.GREEN}✅ Updated dashboard with latest site data{Style.RESET_ALL}")
            
            # Start the dashboard server
            self.serve_dashboard()
            
        except Exception as e:
            self.logger(f"{Fore.RED}❌ Error generating dashboard: {e}{Style.RESET_ALL}")

    def kill_all_ports(self):
        """Kill all processes on ports we're going to use"""
        ports = [3000, 5001, 5002, 9000]  # Dashboard, SiteOne, SiteTwo, LogServer
        
        self.logger(f"{Fore.YELLOW}🔄 Cleaning up ports...{Style.RESET_ALL}")
        for port in ports:
            try:
                # Try to get PID using port
                pid = subprocess.check_output(['lsof', '-ti', f':{port}']).decode().strip()
                if pid:
                    # Kill process
                    subprocess.run(['kill', '-9', pid])
                    self.logger(f"{Fore.GREEN}✅ Freed port {port}{Style.RESET_ALL}")
            except subprocess.CalledProcessError:
                pass  # No process on this port
        
        # Wait for ports to be fully released
        time.sleep(2)
        self.logger(f"{Fore.GREEN}✅ All ports cleared{Style.RESET_ALL}")

    def launch_all_sites(self, start_port=5001, num_sponsored=3):
        """
        Launch all deployed sites
        """
        # Clear any existing running processes
        self.running_processes = []
        self.site_ports = {}

        # Kill all existing port processes
        self.kill_all_ports()

        # Banner
        self.logger(f"{Fore.MAGENTA}🌍 Multi-Site Launch Sequence Initiated {Fore.YELLOW}v1.0{Style.RESET_ALL}")
        
        # Start logging server
        class LogServer(HTTPServer):
            def server_bind(self):
                self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
                self.socket.bind(self.server_address)

        def run_log_server():
            port = 9000  # Use port 9000 for logging
            max_retries = 10
            
            for retry in range(max_retries):
                try:
                    # Kill any existing process on the port
                    try:
                        pid = subprocess.check_output(['lsof', '-ti', f':{port}']).decode().strip()
                        if pid:
                            subprocess.run(['kill', '-9', pid])
                            time.sleep(1)
                    except subprocess.CalledProcessError:
                        pass  # No process found on port
                    
                    log_server = LogServer(('localhost', port), LogHandler)
                    print(f"{Fore.GREEN}📝 Scam logging server running on port {port}{Style.RESET_ALL}")
                    print(f"{Fore.GREEN}📁 Logs will be written to: {RUN_NAME}/scams.log{Style.RESET_ALL}")
                    log_server.serve_forever()
                    break
                except OSError as e:
                    if retry < max_retries - 1:
                        port += 1  # Try next port
                        continue
                    else:
                        self.logger(f"{Fore.RED}❌ Failed to start log server after {max_retries} attempts{Style.RESET_ALL}")
                        raise e

        log_thread = threading.Thread(target=run_log_server)
        log_thread.daemon = True
        log_thread.start()
        
        # Retrieve sites
        if not self.sites:
            self.get_sites()

        # Launch sites
        for index, site in enumerate(self.sites):
            site_name = site[1]
            site_path = os.path.join(os.path.dirname(__file__), RUN_NAME, site_name)
            port = start_port + index

            # Launch site
            self.launch_site(site_path, site_name, port)

        # Generate site deployments JSON
        self.generate_site_deployments_json()
        
        # Generate and open dashboard
        self.generate_dashboard(num_sponsored=num_sponsored)

        # Output site ports
        print("\n" + "=" * 50)
        print(f"{Fore.GREEN}🌐 Site Deployment Summary{Style.RESET_ALL}")
        print("=" * 50)
        for site, port in self.site_ports.items():
            site_url = f"http://localhost:{port}/sites/template/index.html"
            print(f"   🔗 {site}: {site_url}")
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

# If script is run directly, launch all sites
if __name__ == '__main__':
    deployer = SiteDeployer()
    deployer.launch_all_sites(num_sponsored=int(sys.argv[2]) if len(sys.argv) > 2 else 3)
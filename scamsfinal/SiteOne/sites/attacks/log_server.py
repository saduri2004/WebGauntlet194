from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime
import os

# Get current date for filename
current_date = datetime.now().strftime('%Y-%m-%d')
LOG_FILE = f'/liveSites/scams_{current_date}.log'

# Ensure directory exists
os.makedirs('/liveSites', exist_ok=True)

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

        # Write to log file
        with open(LOG_FILE, 'a') as f:
            f.write(log_entry)
        
        print(f"Logged: {log_entry.strip()}")  # Print to console for verification
        
        # Send response
        self.wfile.write(json.dumps({'status': 'ok'}).encode('utf-8'))

    def do_OPTIONS(self):
        # Handle CORS preflight
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

server = HTTPServer(('localhost', 8080), LogHandler)
print(f"Log server running on port 8080...")
print(f"Logging to: {LOG_FILE}")
server.serve_forever()

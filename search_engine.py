#!/usr/bin/env python3
import http.server
import socketserver
import os

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 5000

Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🔍 Serving at http://localhost:{PORT}")
        httpd.serve_forever()
except OSError as e:
    if "Address already in use" in str(e):
        print(f"❌ Port {PORT} is already in use. Please free up the port and try again.")
    else:
        print(f"❌ Error: {e}")
except Exception as e:
    print(f"❌ Error: {e}")

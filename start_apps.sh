#!/bin/bash

# Kill any existing processes on the specified ports
kill_port() {
    local port=$1
    lsof -ti:$port | xargs kill -9 2>/dev/null
}

# Start an application with a specific port
start_app() {
    local app_path=$1
    local port=$2
    local npm_command=$3
    
    echo "Starting ${app_path} on port ${port}"
    cd "$app_path"
    
    # Kill existing process on the port
    kill_port $port
    
    # Start the application
    PORT=$port npm "$npm_command"
}

# Kill ports first
kill_port 3000   # Search Engine
kill_port 3001   # WebGauntlet
kill_port 3002   # Ecommerce Store
kill_port 3003   # Middle Store
kill_port 3004   # Middle Store
kill_port 3005   # Middle Store
kill_port 3006   # Middle Store
kill_port 3007   # Middle Store

# Start applications in separate terminal windows
osascript -e 'tell application "Terminal"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/search-engine && PORT=3000 npm start"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/webgauntlet && PORT=3001 npm run dev"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/ecommerce-store && PORT=3002 npm run dev"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/middle-store && PORT=3003 npm run dev"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/ai-agent-message && PORT=3006 npm run dev"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/scam-warning && PORT=3005 npm run dev"
    do script "cd /Users/sasankaduri/WebGauntlet copy 2/pii-leakage && PORT=3007 npm run dev"
end tell'

echo "Applications started in separate terminal windows."

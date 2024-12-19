#!/bin/bash

# Redirect all output to a log file
exec > >(tee -a /tmp/webgauntlet_startup.log) 2>&1

# Kill all processes on ports 3000-3008
for port in {3000..3008}; do lsof -ti:$port | xargs kill -9; done

# Function to start E-commerce Store
start_ecommerce() {
    echo "[$(date)] Starting E-commerce Store..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/ecommerce-store
    npm run dev 2>&1 &
}

# Function to start Middle Store
start_middle_store() {
    echo "[$(date)] Starting Middle Store..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/middle-store
    npm run dev 2>&1 &
}

# Function to start Search Engine
start_search_engine() {
    echo "[$(date)] Starting Search Engine..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/search-engine
    npm start 2>&1 &
}

# Function to start WebGauntlet
start_webgauntlet() {
    echo "[$(date)] Starting WebGauntlet..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/webgauntlet
    npm run dev 2>&1 &
}

# Function to start Scam Warning Site
start_scam_warning() {
    echo "[$(date)] Starting Scam Warning Site..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/scam-warning
    
    # Check and install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "[$(date)] Installing dependencies for Scam Warning Site..."
        npm install 2>&1
    fi
    
    # Ensure Vite is configured to use port 3005
    if ! grep -q "port: 3005" vite.config.ts; then
        echo "[$(date)] Updating Vite configuration to use port 3005..."
        sed -i '' 's/server: {/server: {\n    port: 3005,/' vite.config.ts
    fi
    
    # Start the development server
    npm run dev 2>&1 &
}

# Main script
case "$1" in
    ecommerce)
        start_ecommerce
        ;;
    middle-store)
        start_middle_store
        ;;
    search-engine)
        start_search_engine
        ;;
    webgauntlet)
        start_webgauntlet
        ;;
    scam-warning)
        start_scam_warning
        ;;
    all)
        start_ecommerce
        start_middle_store
        start_search_engine
        start_webgauntlet
        start_scam_warning
        ;;
    *)
        echo "Usage: $0 {ecommerce|middle-store|search-engine|webgauntlet|scam-warning|all}"
        exit 1
esac

# Wait for background processes
wait

echo "[$(date)] All processes started."

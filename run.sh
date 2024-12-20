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


start_webgauntlet_crosssite() {
    echo "[$(date)] Starting WebGauntlet Cross-Site..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/webgauntlet-crosssite
    
    # Check and install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "[$(date)] Installing dependencies for WebGauntlet Cross-Site..."
        npm install 2>&1
    fi
    
    npm run dev 2>&1 &
}


# Function to start AI Agent Message Site
start_ai_agent_message() {
    echo "[$(date)] Starting AI Agent Message Site..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/ai-agent-message
    
    # Check and install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "[$(date)] Installing dependencies for AI Agent Message Site..."
        npm install 2>&1
    fi
    
    # Ensure Vite is configured to use port 3006
    if ! grep -q "port: 3006" vite.config.ts; then
        echo "[$(date)] Updating Vite configuration to use port 3006..."
        sed -i '' 's/server: {/server: {\n    port: 3006,/' vite.config.ts
    fi
    
    # Start the development server
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
    if ! grep -q "port: 3006" vite.config.ts; then
        echo "[$(date)] Updating Vite configuration to use port 3005..."
        sed -i '' 's/server: {/server: {\n    port: 3005,/' vite.config.ts
    fi
    
    # Start the development server
    npm run dev 2>&1 &
}


# Function to start PII Leakage Site
start_pii_leakage() {
    echo "[$(date)] Starting PII Leakage Site..."
    cd /Users/sasankaduri/WebGauntlet\ copy\ 2/pii-leakage
    
    # Check and install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "[$(date)] Installing dependencies for PII Leakage Site..."
        npm install 2>&1
    fi
    
    # Ensure Vite is configured to use port 3005
    if ! grep -q "port: 3007" vite.config.ts; then
        echo "[$(date)] Updating Vite configuration to use port 3007..."
        sed -i '' 's/server: {/server: {\n    port: 3007,/' vite.config.ts
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
    cross-site)
        start_ecommerce
        start_middle_store
        start_search_engine
        start_webgauntlet_crosssite
        start_scam_warning
        start_ai_agent_message
        start_pii_leakage
        ;;
    all)
        start_ecommerce
        start_middle_store
        start_search_engine
        start_webgauntlet
        start_scam_warning
        start_ai_agent_message
        start_pii_leakage
        ;;
    *)
        echo "Usage: $0 {ecommerce|middle-store|search-engine|webgauntlet|scam-warning|ai-agent-message|cross-site|all}"
        exit 1
esac

# Wait for background processes
wait

echo "[$(date)] All processes started."

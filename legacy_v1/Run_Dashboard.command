#!/bin/bash
# Hardcoded path to ensure stability
cd "/Users/jinsurang/Desktop/marketing_singlemarks"

echo "=========================================="
echo " Starting Marketing Dashboard (Safe Mode) "
echo "=========================================="
echo "Working Directory: $(pwd)"

# Check if server.py exists
if [ ! -f "server.py" ]; then
    echo "Error: server.py not found in $(pwd)"
    read -p "Press Enter to exit..."
    exit 1
fi

# Open Browser
open "http://localhost:8000"

# Run Server
echo "Running server..."
python3 server.py

# Keep window open if server crashes
echo "Server stopped."
read -p "Press Enter to close..."

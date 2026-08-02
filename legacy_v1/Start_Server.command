#!/bin/bash
# Move to the correct directory
cd "/Users/jinsurang/Desktop/marketing_singlemarks"

echo "=========================================="
echo "    MARKETING DASHBOARD LAUNCHER          "
echo "=========================================="

# Run the server
open "http://localhost:8000"
python3 server.py

#!/bin/bash
# This script starts a simple HTTP server for the static frontend files.

echo "Starting Python HTTP server on port 9000 to serve static files..."

# Serve the current directory (where index.html is located) on port 9000.
# This makes the frontend accessible via http://localhost:9000
python3 -m http.server 9000

#!/bin/bash

# Clean build test script
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "🏗️ Testing build..."
npm run build

echo "🚀 Build test complete!"

@echo off
echo 🧹 Cleaning previous build...
if exist .next rmdir /s /q .next
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 📦 Installing dependencies...
npm install

echo 🏗️ Testing build...
npm run build

echo 🚀 Build test complete!
pause
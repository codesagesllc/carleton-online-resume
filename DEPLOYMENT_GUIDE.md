# Vercel Deployment Debug Guide

## Step 1: Test Local Build
```bash
cd carleton-online-resume
npm install
npm run build
```

## Step 2: Check Vercel Dashboard
- Go to https://vercel.com/dashboard
- Look for 'carleton-online-resume' project
- Check deployment logs for errors

## Step 3: Manual Deployment
If automatic deployment fails, try manual:
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Step 4: Common Fixes
- Check case sensitivity of imports
- Ensure all dependencies are in package.json
- Remove .env files from git
- Clear .next folder

## Step 5: Simplified Deployment
If still failing, use minimal config:
- Remove vercel.json temporarily  
- Remove middleware.ts temporarily
- Use basic next.config.js

#!/bin/bash

# ErtebatYar CRM - GitHub Pages Deployment Script
# This script helps you deploy your CRM to GitHub Pages

echo "🚀 ErtebatYar CRM - GitHub Pages Deployment"
echo "=========================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit."
else
    echo "💾 Committing changes..."
    git commit -m "Deploy ErtebatYar CRM to GitHub Pages"
fi

# Get repository URL from user
echo ""
echo "🔗 Please provide your GitHub repository URL:"
echo "   Example: https://github.com/yourusername/ertebatyar.git"
read -p "Repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Repository URL is required."
    exit 1
fi

# Add remote origin
echo "🌐 Setting up remote repository..."
git remote remove origin 2>/dev/null
git remote add origin "$REO_URL"

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your GitHub repository settings"
echo "2. Navigate to 'Pages' section"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Click 'Save'"
echo ""
echo "🌐 Your site will be available at:"
echo "   https://$(echo $REPO_URL | sed 's/.*github.com\///' | sed 's/\.git$//' | sed 's/\/.*$//').github.io/$(echo $REPO_URL | sed 's/.*github.com\///' | sed 's/\.git$//' | sed 's/.*\///')"
echo ""
echo "⏰ It may take 5-10 minutes for the site to be live."
echo "🎉 Enjoy your ErtebatYar CRM!"


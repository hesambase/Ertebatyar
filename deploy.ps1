# ErtebatYar CRM - GitHub Pages Deployment Script (PowerShell)
# This script helps you deploy your CRM to GitHub Pages

Write-Host "🚀 ErtebatYar CRM - GitHub Pages Deployment" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if we're in a git repository
if (-not (Test-Path ".git")) {
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Blue
    git init
}

# Add all files
Write-Host "📦 Adding files to Git..." -ForegroundColor Blue
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes..." -ForegroundColor Blue
    git commit -m "Deploy ErtebatYar CRM to GitHub Pages"
} else {
    Write-Host "ℹ️  No changes to commit." -ForegroundColor Yellow
}

# Get repository URL from user
Write-Host ""
Write-Host "🔗 Please provide your GitHub repository URL:" -ForegroundColor Cyan
Write-Host "   Example: https://github.com/yourusername/ertebatyar.git" -ForegroundColor Gray
$repoUrl = Read-Host "Repository URL"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "❌ Repository URL is required." -ForegroundColor Red
    exit 1
}

# Add remote origin
Write-Host "🌐 Setting up remote repository..." -ForegroundColor Blue
git remote remove origin 2>$null
git remote add origin $repoUrl

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Blue
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to your GitHub repository settings" -ForegroundColor White
Write-Host "2. Navigate to 'Pages' section" -ForegroundColor White
Write-Host "3. Select 'Deploy from a branch'" -ForegroundColor White
Write-Host "4. Choose 'main' branch and '/ (root)' folder" -ForegroundColor White
Write-Host "5. Click 'Save'" -ForegroundColor White
Write-Host ""

# Extract username and repository name from URL
$urlParts = $repoUrl -replace "https://github.com/", "" -replace "\.git$", ""
$parts = $urlParts -split "/"
if ($parts.Length -eq 2) {
    $username = $parts[0]
    $repoName = $parts[1]
    $siteUrl = "https://$username.github.io/$repoName"
    Write-Host "🌐 Your site will be available at:" -ForegroundColor Cyan
    Write-Host "   $siteUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "⏰ It may take 5-10 minutes for the site to be live." -ForegroundColor Yellow
Write-Host "🎉 Enjoy your ErtebatYar CRM!" -ForegroundColor Green


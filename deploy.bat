@echo off
echo 🚀 ErtebatYar CRM - GitHub Pages Deployment
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed. Please install Git first.
    echo Download from: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Check if we're in a git repository
if not exist ".git" (
    echo 📁 Initializing Git repository...
    git init
)

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit changes
echo 💾 Committing changes...
git commit -m "Deploy ErtebatYar CRM to GitHub Pages"

REM Get repository URL from user
echo.
echo 🔗 Please provide your GitHub repository URL:
echo    Example: https://github.com/yourusername/ertebatyar.git
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo ❌ Repository URL is required.
    pause
    exit /b 1
)

REM Add remote origin
echo 🌐 Setting up remote repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%

REM Push to GitHub
echo ⬆️  Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Deployment complete!
echo.
echo 📋 Next steps:
echo 1. Go to your GitHub repository settings
echo 2. Navigate to 'Pages' section
echo 3. Select 'Deploy from a branch'
echo 4. Choose 'main' branch and '/ (root)' folder
echo 5. Click 'Save'
echo.
echo ⏰ It may take 5-10 minutes for the site to be live.
echo 🎉 Enjoy your ErtebatYar CRM!
echo.
pause


@echo off
REM GitHub Repository Setup Script
REM This script will connect your local repository to GitHub and push your code

echo ========================================
echo    GitHub Repository Setup Script
echo ========================================
echo.

REM Check if git is available
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Git is available. Proceeding with setup...
echo.

REM Prompt for GitHub username
set /p GITHUB_USERNAME="Enter your GitHub username: "
if "%GITHUB_USERNAME%"=="" (
    echo ERROR: GitHub username is required
    pause
    exit /b 1
)

REM Prompt for repository name
echo.
echo Suggested repository names:
echo   - react-todo-app-evaluation
echo   - todo-app-enhanced
echo   - react-task-manager
echo   - todo-evaluation-project
echo.
set /p REPO_NAME="Enter repository name: "
if "%REPO_NAME%"=="" (
    echo ERROR: Repository name is required
    pause
    exit /b 1
)

REM Construct the repository URL
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo.
echo ========================================
echo Repository Details:
echo Username: %GITHUB_USERNAME%
echo Repository: %REPO_NAME%
echo URL: %REPO_URL%
echo ========================================
echo.

REM Confirm before proceeding
set /p CONFIRM="Continue with this setup? (y/n): "
if /i not "%CONFIRM%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo Setting up repository connection...

REM Add remote origin
echo Adding remote origin...
git remote add origin %REPO_URL%
if %errorlevel% neq 0 (
    echo WARNING: Remote origin might already exist. Removing and re-adding...
    git remote remove origin
    git remote add origin %REPO_URL%
)

REM Set main branch
echo Setting up main branch...
git branch -M main

REM Check if we have commits
git log --oneline -1 >nul 2>&1
if %errorlevel% neq 0 (
    echo No commits found. Creating initial commit...
    git add .
    git commit -m "Initial commit - React Todo App with enhancements"
)

REM Push to GitHub
echo.
echo Pushing to GitHub...
echo NOTE: You may be prompted for your GitHub credentials
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    SUCCESS! Repository Setup Complete
    echo ========================================
    echo.
    echo Your React Todo App has been pushed to:
    echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    echo.
    echo You can now:
    echo 1. View your repository on GitHub
    echo 2. Share the link with your HR team
    echo 3. Set up GitHub Pages for live demo (optional)
    echo.
) else (
    echo.
    echo ========================================
    echo    Setup Error
    echo ========================================
    echo.
    echo There was an error pushing to GitHub.
    echo This might be because:
    echo 1. The repository doesn't exist on GitHub yet
    echo 2. You don't have permission to push
    echo 3. Authentication failed
    echo.
    echo Please:
    echo 1. Create the repository on GitHub first: https://github.com/new
    echo 2. Make sure you're logged in to GitHub
    echo 3. Run this script again
    echo.
)

echo.
pause

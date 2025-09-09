# GitHub Repository Setup Script (PowerShell)
# This script will connect your local repository to GitHub and push your code

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    GitHub Repository Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "✓ Git is available: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Prompt for GitHub username
$githubUsername = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "❌ ERROR: GitHub username is required" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Prompt for repository name
Write-Host ""
Write-Host "Suggested repository names:" -ForegroundColor Yellow
Write-Host "  - react-todo-app-evaluation" -ForegroundColor Gray
Write-Host "  - todo-app-enhanced" -ForegroundColor Gray
Write-Host "  - react-task-manager" -ForegroundColor Gray
Write-Host "  - todo-evaluation-project" -ForegroundColor Gray
Write-Host ""

$repoName = Read-Host "Enter repository name"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    Write-Host "❌ ERROR: Repository name is required" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Construct the repository URL
$repoUrl = "https://github.com/$githubUsername/$repoName.git"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Repository Details:" -ForegroundColor Cyan
Write-Host "Username: $githubUsername" -ForegroundColor White
Write-Host "Repository: $repoName" -ForegroundColor White
Write-Host "URL: $repoUrl" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Confirm before proceeding
$confirm = Read-Host "Continue with this setup? (y/n)"
if ($confirm -notmatch "^[Yy]$") {
    Write-Host "Setup cancelled." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host ""
Write-Host "Setting up repository connection..." -ForegroundColor Green

try {
    # Add remote origin
    Write-Host "Adding remote origin..." -ForegroundColor Blue
    git remote add origin $repoUrl 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Remote origin might already exist. Removing and re-adding..." -ForegroundColor Yellow
        git remote remove origin 2>$null
        git remote add origin $repoUrl
    }

    # Set main branch
    Write-Host "Setting up main branch..." -ForegroundColor Blue
    git branch -M main

    # Check if we have commits
    git log --oneline -1 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "No commits found. Creating initial commit..." -ForegroundColor Blue
        git add .
        git commit -m "Initial commit - React Todo App with enhancements"
    }

    # Push to GitHub
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Blue
    Write-Host "NOTE: You may be prompted for your GitHub credentials" -ForegroundColor Yellow
    Write-Host ""
    
    git push -u origin main

    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "    SUCCESS! Repository Setup Complete" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your React Todo App has been pushed to:" -ForegroundColor Green
        Write-Host "https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "You can now:" -ForegroundColor Green
        Write-Host "1. View your repository on GitHub" -ForegroundColor White
        Write-Host "2. Share the link with your HR team" -ForegroundColor White
        Write-Host "3. Set up GitHub Pages for live demo (optional)" -ForegroundColor White
        Write-Host ""
        
        # Offer to open the repository in browser
        $openBrowser = Read-Host "Would you like to open the repository in your browser? (y/n)"
        if ($openBrowser -match "^[Yy]$") {
            Start-Process "https://github.com/$githubUsername/$repoName"
        }
    } else {
        throw "Push failed"
    }

} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "    Setup Error" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "There was an error pushing to GitHub." -ForegroundColor Red
    Write-Host "This might be because:" -ForegroundColor Yellow
    Write-Host "1. The repository doesn't exist on GitHub yet" -ForegroundColor White
    Write-Host "2. You don't have permission to push" -ForegroundColor White
    Write-Host "3. Authentication failed" -ForegroundColor White
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Create the repository on GitHub first: https://github.com/new" -ForegroundColor White
    Write-Host "2. Make sure you're logged in to GitHub" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
}

Read-Host "Press Enter to exit"

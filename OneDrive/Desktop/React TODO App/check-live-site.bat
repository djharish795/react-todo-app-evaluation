@echo off
echo ========================================
echo    GitHub Pages Status Checker
echo ========================================
echo.
echo Checking if your React Todo App is live...
echo.

REM Your GitHub Pages URL
set PAGES_URL=https://djharish795.github.io/react-todo-app-evaluation

echo Testing URL: %PAGES_URL%
echo.

REM Use curl to check if the site is responding (if available)
curl -s -o nul -w "HTTP Status: %%{http_code}\n" %PAGES_URL% 2>nul
if %errorlevel% neq 0 (
    echo Curl not available, opening in browser instead...
    start %PAGES_URL%
) else (
    echo.
    echo Opening your live React Todo App...
    start %PAGES_URL%
)

echo.
echo ========================================
echo    Your Live App Information
echo ========================================
echo.
echo Live Demo: %PAGES_URL%
echo Repository: https://github.com/djharish795/react-todo-app-evaluation
echo.
echo If the site shows 404, wait 2-3 minutes for GitHub Pages
echo to finish building and deploying your app.
echo.
echo Your HR team can access your app at the Live Demo URL!
echo.
pause

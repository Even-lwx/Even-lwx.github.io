@echo off
chcp 65001 >nul
title Hexo Blog - EdgeOne Deploy
cd /d "%~dp0"

echo ==========================================
echo        Hexo Blog EdgeOne Deploy
echo ==========================================
echo.

echo [1/2] Cleaning previous build...
call npm run clean
if errorlevel 1 goto error

echo [2/2] Building and deploying to EdgeOne...
call npm run deploy:edgeone
if errorlevel 1 goto error

echo.
echo ==========================================
echo Deployment completed. Use the URL returned by EdgeOne.
echo ==========================================
pause
exit /b 0

:error
echo.
echo ==========================================
echo Deployment failed. Check the error output above.
echo ==========================================
pause
exit /b 1

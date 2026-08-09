@echo off
title Hexo 博客自动部署
cls

echo ==========================================
echo        Hexo 博客自动部署流程
echo ==========================================
echo.

echo [1/4] 初始清理缓存...
call hexo clean
if errorlevel 1 goto error
echo [完成] 缓存清理成功
echo.

echo [2/4] 生成静态文件...
call hexo generate
if errorlevel 1 goto error
echo [完成] 静态文件生成成功
echo.

echo [3/4] 部署到服务器...
call hexo deploy
if errorlevel 1 goto error
echo [完成] 博客部署成功
echo.

echo [4/4] 最终清理缓存...
call hexo clean
if errorlevel 1 goto error
echo [完成] 最终缓存清理成功
echo.

echo ==========================================
echo 部署流程全部完成！
echo ==========================================
echo.
pause
exit

:error
echo.
echo ==========================================
echo 出现错误，部署已中断
echo 请查看上方输出
echo ==========================================
pause
exit

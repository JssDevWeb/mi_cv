@echo off
echo Iniciando servidor web local para probar el CV...
echo Presiona Ctrl+C para detener el servidor

cd /d %~dp0
start http://localhost:8000
php -S localhost:8000

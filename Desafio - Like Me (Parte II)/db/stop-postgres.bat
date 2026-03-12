@echo off
echo Deteniendo PostgreSQL...

docker compose down
if %errorlevel% neq 0 (
    echo Error al detener PostgreSQL.
    exit /b %errorlevel%
)

echo PostgreSQL detenido.
pause
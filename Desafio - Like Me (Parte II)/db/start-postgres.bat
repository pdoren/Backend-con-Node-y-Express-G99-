@echo off
echo Levantando PostgreSQL para la base likeme...

docker compose up -d
if %errorlevel% neq 0 (
    echo Error al levantar PostgreSQL.
    exit /b %errorlevel%
)

echo PostgreSQL levantado correctamente.
echo Host: localhost
echo Puerto: 5433
echo Base de datos: likeme
echo Usuario: postgres
echo Password: postgres
pause
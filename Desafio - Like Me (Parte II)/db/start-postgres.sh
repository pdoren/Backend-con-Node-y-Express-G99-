#!/usr/bin/env bash

set -e

echo "Levantando PostgreSQL para la base likeme..."

if command -v docker-compose >/dev/null 2>&1; then
  docker-compose up -d
elif docker compose version >/dev/null 2>&1; then
  docker compose up -d
else
  echo "Error: Docker Compose no está instalado."
  exit 1
fi

echo "PostgreSQL levantado correctamente."
echo "Host: localhost"
echo "Puerto: 5433"
echo "Base de datos: likeme"
echo "Usuario: postgres"
echo "Password: postgres"
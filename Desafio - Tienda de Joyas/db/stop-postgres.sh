#!/usr/bin/env bash

set -e

echo "Deteniendo PostgreSQL..."

if command -v docker-compose >/dev/null 2>&1; then
  docker-compose down
elif docker compose version >/dev/null 2>&1; then
  docker compose down
else
  echo "Error: Docker Compose no está instalado."
  exit 1
fi

echo "PostgreSQL detenido."
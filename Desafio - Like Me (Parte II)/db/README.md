# PostgreSQL Docker - Base de Datos `likeme`

Este proyecto permite levantar una base de datos **PostgreSQL** usando
**Docker** para Windows y Linux.\
La base de datos se inicializa automáticamente con la tabla `posts`.

------------------------------------------------------------------------

# Requisitos

Antes de ejecutar el proyecto debes tener instalado:

-   Docker
-   Docker Compose

Verificar instalación:

``` bash
docker --version
docker compose version
```

------------------------------------------------------------------------

# Estructura del Proyecto

    .
    ├── docker-compose.yml
    ├── init.sql
    ├── start-postgres.sh
    ├── stop-postgres.sh
    ├── start-postgres.bat
    └── stop-postgres.bat

------------------------------------------------------------------------

# Base de Datos

Nombre de la base:

    likeme

Tabla creada automáticamente:

``` sql
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(25),
    img VARCHAR(1000),
    descripcion VARCHAR(255),
    likes INT
);
```

------------------------------------------------------------------------

# Configuración de Conexión

    Host: localhost
    Port: 5432
    Database: likeme
    User: postgres
    Password: postgres

------------------------------------------------------------------------

# Levantar PostgreSQL

## Linux / macOS

Dar permisos de ejecución al script:

``` bash
chmod +x start-postgres.sh
```

Ejecutar:

``` bash
./start-postgres.sh
```

------------------------------------------------------------------------

## Windows

Ejecutar el script:

    start-postgres.bat

------------------------------------------------------------------------

# Detener PostgreSQL

## Linux / macOS

``` bash
./stop-postgres.sh
```

## Windows

    stop-postgres.bat

------------------------------------------------------------------------

# Acceder a PostgreSQL desde Docker

``` bash
docker exec -it likeme_postgres psql -U postgres -d likeme
```

Listar tablas:

``` sql
\dt
```

Consultar datos:

``` sql
SELECT * FROM posts;
```

------------------------------------------------------------------------

# Reiniciar Base de Datos desde Cero

Si deseas eliminar los datos y recrear la base:

``` bash
docker compose down -v
docker compose up -d
```

Esto eliminará el volumen donde se guardan los datos.

------------------------------------------------------------------------

# Notas

-   El archivo `init.sql` se ejecuta **solo la primera vez** que se crea
    el contenedor.
-   Los datos se almacenan en un **volumen Docker persistente**.
-   Compatible con **Windows, Linux y macOS**.

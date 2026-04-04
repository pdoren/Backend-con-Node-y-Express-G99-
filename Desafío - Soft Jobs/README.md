# Desafío - Tienda de Joyas

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** para consultar el inventario de una tienda de joyas, aplicar filtros y obtener joyas por ID. El proyecto también incluye middlewares de reporte para registrar actividad en las rutas.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- pg-format
- cors

## Estructura

```bash
Desafio - Tienda de Joyas/
├── backend/
│   ├── index.js
│   └── package.json
└── db/
    └── init.sql
    ├── docker-compose.yml
    ├── start-postgres.bat
    ├── start-postgres.sh
    ├── stop-postgres.bat
    └── stop-postgres.sh
```

La tabla principal es `inventario` y contiene campos como `id`, `nombre`, `categoria`, `metal`, `precio` y `stock`. El script SQL además inserta datos de ejemplo.

## Instalación

```bash
git clone https://github.com/pdoren/Backend-con-Node-y-Express-G99-.git
cd "Backend-con-Node-y-Express-G99-/Desafio - Tienda de Joyas/backend"
npm install
```

## Base de datos

El backend está configurado para conectarse a PostgreSQL en:

- host: `localhost`
- puerto: `5433`
- usuario: `postgres`
- password: `postgres`
- base de datos: `joyas`

Luego debes crear la base y ejecutar `db/init.sql`.

## Ejecución

```bash
node index.js
```

Servidor por defecto:

```bash
http://localhost:3000
```

## Endpoints

### `GET /joyas`
Lista joyas con paginación y orden.

Ejemplo:

```bash
/joyas?limits=3&order_by=id_ASC&page=1
```

### `GET /joyas/filtros`
Filtra por precio, categoría y metal.

Ejemplo:

```bash
/joyas/filtros?precio_min=10000&precio_max=30000&categoria=aros&metal=oro
```

### `GET /joyas/joya/:id`
Obtiene una joya por ID.

Ejemplo:

```bash
/joyas/joya/1
```

Estas rutas y sus validaciones están implementadas en `backend/index.js`.

## Middleware de reportes

La aplicación registra actividad general de las rutas y eventos específicos de filtros y consultas por ID, además de guardar reportes en un archivo `reportes.log`.

## Autor

**Pablo Saavedra**

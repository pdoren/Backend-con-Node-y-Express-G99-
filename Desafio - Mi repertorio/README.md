# 🎵 Desafío - Mi Repertorio

Aplicación backend desarrollada con **Node.js y Express** que permite
gestionar un repertorio de canciones mediante una **API REST**.\
La información se almacena en un archivo local `repertorio.json`
utilizando el módulo **File System (fs)**.

Este proyecto forma parte del curso **Backend con Node y Express -
Desafío Latam**.

------------------------------------------------------------------------

# 📌 Funcionalidades

La API permite realizar operaciones **CRUD** sobre un repertorio de
canciones:

### POST `/canciones`

Agrega una nueva canción al repertorio.

### GET `/canciones`

Obtiene todas las canciones registradas en el repertorio.

### PUT `/canciones/:id`

Actualiza los datos de una canción existente.

### DELETE `/canciones/:id`

Elimina una canción del repertorio.

------------------------------------------------------------------------

# 🛠 Tecnologías utilizadas

-   Node.js
-   Express
-   File System (fs)
-   JSON para almacenamiento local

------------------------------------------------------------------------

# 📂 Estructura del proyecto

    Desafio - Mi repertorio
    │
    ├── index.js
    ├── repertorio.json
    ├── package.json
    ├── package-lock.json
    └── node_modules

------------------------------------------------------------------------

# ▶️ Instalación y uso

### 1. Clonar el repositorio

``` bash
git clone https://github.com/pdoren/Backend-con-Node-y-Express-G99-.git
```

### 2. Entrar a la carpeta del desafío

``` bash
cd "Desafio - Mi repertorio"
```

### 3. Instalar dependencias

``` bash
npm install
```

### 4. Ejecutar el servidor

``` bash
node index.js
```

El servidor quedará disponible en:

    http://localhost:3000

------------------------------------------------------------------------

# 🧪 Ejemplos de uso de la API

## Obtener canciones

    GET /canciones

Respuesta ejemplo:

``` json
[
  {
    "id": 1,
    "titulo": "Yellow",
    "artista": "Coldplay",
    "tono": "B"
  }
]
```

------------------------------------------------------------------------

## Agregar una canción

    POST /canciones

Body:

``` json
{
  "titulo": "Fix You",
  "artista": "Coldplay",
  "tono": "C"
}
```

------------------------------------------------------------------------

## Actualizar una canción

    PUT /canciones/1

Body:

``` json
{
  "titulo": "Fix You",
  "artista": "Coldplay",
  "tono": "D"
}
```

------------------------------------------------------------------------

## Eliminar una canción

    DELETE /canciones/1

------------------------------------------------------------------------

# 👨‍💻 Autor

**Pablo Saavedra**

Repositorio creado como parte del curso:

**Backend con Node y Express - Desafío Latam**

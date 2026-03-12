# ❤️ Desafío - Like Me (Parte II)

Aplicación desarrollada con **Node.js, Express y PostgreSQL** para
gestionar publicaciones de una app tipo **Like Me**.\
El proyecto considera **backend**, **frontend** y archivos de apoyo para
base de datos.

Este desafío forma parte del curso **Backend con Node y Express -
Desafío Latam**.

------------------------------------------------------------------------

## 📌 Funcionalidades (backend)

La API permite:

### GET `/posts`

Obtiene todas las publicaciones almacenadas en la base de datos.

### POST `/posts`

Agrega una nueva publicación.

Body esperado:

``` json
{
  "titulo": "Mi primer post",
  "url": "https://imagen.com/foto.jpg",
  "descripcion": "Descripción del post"
}
```

### PUT `/posts/:id`

Actualiza los datos de una publicación existente.

### DELETE `/posts/:id`

Elimina una publicación del repertorio.

------------------------------------------------------------------------

## 🛠 Tecnologías utilizadas

-   Node.js
-   Express
-   PostgreSQL
-   Docker
-   pg
-   CORS
-   JavaScript
-   HTML / CSS / Frontend del desafío

------------------------------------------------------------------------

## 📂 Estructura del proyecto

    Desafio - Like Me (Parte II)
    │
    ├── backend/
    ├── db/
    ├── frontend/
    └── 03_d_Desafío_-_Like_Me__Parte_II_.pdf

------------------------------------------------------------------------

## ▶️ Instalación y ejecución

### 1. Clonar el repositorio

``` bash
git clone https://github.com/pdoren/Backend-con-Node-y-Express-G99-.git
```

### 2. Entrar a la carpeta del desafío

``` bash
cd "Desafio - Like Me (Parte I)"
```

### 3. Levantar la base de datos

La base de datos se puede levantar con Docker Compose, ver README.md en
`db/`.

### 4. Instalar dependencias del backend

``` bash
cd backend
npm install
```

### 5. Ejecutar el servidor

``` bash
node index.js
```

Servidor disponible en:

    http://localhost:3000

------------------------------------------------------------------------

## 🧪 Endpoints

### Obtener posts

    GET /posts

### Crear un post

    POST /posts

Ejemplo de body:

``` json
{
  "titulo": "Nuevo post",
  "url": "https://imagen.com/foto.jpg",
  "descripcion": "Contenido del post"
}
```

------------------------------------------------------------------------

## 👨‍💻 Autor

**Pablo Saavedra**

Proyecto realizado para el curso **Backend con Node y Express - Desafío
Latam**.

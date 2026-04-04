# Desafío - Soft Jobs

Aplicación Full Stack desarrollada para el desafío **Soft Jobs**, compuesta por un **backend en Node.js + Express + PostgreSQL** y un **frontend en React + Vite**.  
El sistema permite registrar usuarios, iniciar sesión mediante **JWT** y consultar los datos del usuario autenticado a través de una ruta protegida.

## Tecnologías utilizadas

### Backend
- Node.js
- Express
- PostgreSQL
- pg
- dotenv
- bcryptjs
- jsonwebtoken
- cors

### Frontend
- React
- Vite
- Axios
- React Router DOM
- Bootstrap

## Estructura del proyecto

```bash
Desafío - Soft Jobs/
├── backend/
│   ├── db/
│   │   ├── connection.js
│   │   └── users.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── database/
│   └── package.json
├── 04_d_Desafío_-_Soft_Jobs.pdf
└── README.md
```

## Funcionalidades principales

- Registro de usuarios
- Login con generación de token JWT
- Encriptación de contraseña con `bcryptjs`
- Ruta protegida para consultar el perfil del usuario autenticado
- Validación de token mediante middleware de autenticación

## Endpoints backend

### `POST /usuarios`
Registra un nuevo usuario.

**Body de ejemplo:**
```json
{
  "email": "correo@ejemplo.com",
  "password": "123456",
  "rol": "Frontend Developer",
  "lenguage": "JavaScript"
}
```

**Respuesta esperada:**
```json
{
  "token": "jwt_token"
}
```

### `POST /login`
Inicia sesión con un usuario existente.

**Body de ejemplo:**
```json
{
  "email": "correo@ejemplo.com",
  "password": "123456"
}
```

**Respuesta esperada:**
```json
{
  "token": "jwt_token"
}
```

### `GET /usuarios`
Obtiene los datos del usuario autenticado.

**Headers:**
```bash
Authorization: Bearer <token>
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "email": "correo@ejemplo.com",
    "rol": "Frontend Developer",
    "lenguage": "JavaScript"
  }
]
```

## Configuración del backend

Crear un archivo `.env` dentro de `backend/` con variables como estas:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=softjobs
DB_PORT=5432
DOMAIN_URL_APP=http://localhost:3000
NODE_ENV=development
```

## Instalación y ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/pdoren/Backend-con-Node-y-Express-G99-.git
```

### 2. Backend
```bash
cd "Backend-con-Node-y-Express-G99-/Desafío - Soft Jobs/backend"
npm install
node index.js
```

Servidor por defecto:
```bash
http://localhost:3000
```

### 3. Frontend
```bash
cd "../frontend"
npm install
npm run dev
```

## Autenticación

El token JWT se genera al registrar o iniciar sesión, y luego debe enviarse en el header `Authorization` para acceder a la ruta protegida `/usuarios`.

## Notas

- Las contraseñas se almacenan hasheadas con `bcryptjs`.
- El backend usa consultas parametrizadas para interactuar con PostgreSQL.
- El frontend define los endpoints en `src/config/constans.js`.

## Autor

**Pablo Saavedra**

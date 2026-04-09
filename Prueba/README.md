# Prueba - Cafetería Nanacao

API REST desarrollada con **Node.js**, **Express**, **Jest** y **Supertest** para gestionar cafés y validar operaciones CRUD mediante pruebas automatizadas.

Este proyecto forma parte del repositorio **Backend-con-Node-y-Express-G99-** y resuelve una prueba práctica enfocada en:

- consumo y creación de endpoints REST
- manejo de códigos de estado HTTP
- validación de errores
- pruebas de integración con Jest y Supertest

## Tecnologías utilizadas

- Node.js
- Express 4.18.1
- Jest 28.1.3
- Supertest 6.2.4

## Estructura del proyecto

```bash
Prueba/
├── cafes.json
├── index.js
├── package.json
└── tests/
    └── server.spec.js
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/pdoren/Backend-con-Node-y-Express-G99-.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd Backend-con-Node-y-Express-G99-/Prueba
```

3. Instalar dependencias:

```bash
npm install
```

## Ejecución del proyecto

El servidor se ejecuta desde `index.js` en el puerto **3000**.

```bash
node index.js
```

Salida esperada en consola:

```bash
SERVER ON
```

## Ejecución de pruebas

```bash
npm test
```

El script configurado en `package.json` es:

```json
"test": "jest --forceExit"
```

## Datos iniciales

La API utiliza un archivo local `cafes.json` como fuente de datos inicial.

Ejemplo:

```json
[
  { "id": 1, "nombre": "Cortado" },
  { "id": 2, "nombre": "Americano" },
  { "id": 3, "nombre": "Mocacino" },
  { "id": 4, "nombre": "Cappuccino" }
]
```

## Endpoints disponibles

### GET /cafes
Obtiene el listado completo de cafés.

**Respuesta esperada:** `200 OK`

---

### GET /cafes/:id
Obtiene un café por su identificador.

**Respuestas:**
- `200 OK` si existe
- `404 Not Found` si no existe

---

### POST /cafes
Agrega un nuevo café.

**Body de ejemplo:**

```json
{
  "id": 10,
  "nombre": "Negro"
}
```

**Respuestas:**
- `201 Created` si se agrega correctamente
- `400 Bad Request` si ya existe un café con el mismo id

---

### PUT /cafes/:id
Actualiza un café existente.

**Validación principal:**
El `id` de la URL debe coincidir con el `id` enviado en el body.

**Respuestas:**
- `200 OK` si se actualiza correctamente
- `400 Bad Request` si los id no coinciden
- `404 Not Found` si el café no existe

---

### DELETE /cafes/:id
Elimina un café por su id.

**Requisito:**
Debe enviarse el header `Authorization`.

**Respuestas:**
- `200 OK` si se elimina correctamente
- `400 Bad Request` si no se envía token
- `404 Not Found` si el café no existe

---

### Ruta no encontrada
Para cualquier otra ruta, la API responde:

- `404 Not Found`

## Pruebas implementadas

En `tests/server.spec.js` se validan los siguientes casos:

- `GET /cafes` responde `200` y retorna un arreglo con al menos un objeto
- `DELETE /cafes/:id` responde `404` al intentar eliminar un café inexistente
- `POST /cafes` agrega un nuevo café y responde `201`
- `PUT /cafes/:id` responde `400` cuando el id del parámetro no coincide con el id enviado en el body

## Ejemplos de uso con Thunder Client o Postman

### Obtener cafés

```http
GET http://localhost:3000/cafes
```

### Crear café

```http
POST http://localhost:3000/cafes
Content-Type: application/json

{
  "id": 10,
  "nombre": "Negro"
}
```

### Actualizar café

```http
PUT http://localhost:3000/cafes/2
Content-Type: application/json

{
  "id": 2,
  "nombre": "Café doble"
}
```

### Eliminar café

```http
DELETE http://localhost:3000/cafes/2
Authorization: Bearer token_de_ejemplo
```

## Observaciones

- Actualmente los datos se almacenan en memoria a partir de `cafes.json`, por lo que los cambios no persisten si se reinicia el servidor.
- `jest` y `supertest` están definidos dentro de `dependencies`; en un proyecto productivo normalmente se ubicarían en `devDependencies`.
- El servidor se exporta desde `index.js`, lo que permite reutilizarlo en las pruebas automatizadas.

## Autor

**Pablo Saavedra**

Repositorio base:
**pdoren/Backend-con-Node-y-Express-G99-**

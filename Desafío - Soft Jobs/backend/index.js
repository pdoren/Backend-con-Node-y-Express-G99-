// index.js
require("dotenv").config();

const { insertUser, getUserByEmail, existsUserByEmail } = require("./db/users");
const { authMiddleware, getToken } = require("./middlewares/auth");
const reportMiddleware = require("./middlewares/reportMiddleware");
const { registerCredentialsMiddleware, loginCredentialsMiddleware } = require("./middlewares/credentialsMiddleware");

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost:${PORT}`;

// ---------- validaciones iniciales ----------

if (!process.env.JWT_SECRET) {
  throw new Error("Falta definir JWT_SECRET en las variables de entorno");
}

// --------- middleware ----------

app.use(cors()); // Por diferencias entre el puerto del frontend y backend, es necesario para evitar bloqueos de CORS
app.use(express.json()); // middleware para parsear el body de la petición
app.use(reportMiddleware); // middleware para reportar las peticiones

// ---------- Rutas ----------

// POST /usuarios -> registro de usuarios
app.post("/usuarios", registerCredentialsMiddleware, async (req, res) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    // Validar si el usuario ya existe
    const userExists = await existsUserByEmail(email);
    if (userExists) {
      return res.status(409).json({ error: "Usuario ya registrado" });
    }

    // Insertar el nuevo usuario
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await insertUser(email, passwordHash, rol, lenguage);
    if (result.rowCount !== 1) {
      return res.status(500).json({ error: "Error interno" });
    }

    // Generar token
    const newUser = result.rows[0];
    const token = getToken(newUser);
    return res.status(201).json({ token });
  } catch (error) {
    console.error("Error en POST /usuarios:", error);
    return res.status(500).json({ error: "Error interno" });
  }
});

// POST /login -> login de usuarios
app.post("/login", loginCredentialsMiddleware, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar si el usuario existe
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Validar si el password es correcto
    const passwordIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordIsCorrect) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Generar token
    const token = getToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error en POST /login:", error);
    return res.status(500).json({ error: "Error interno" });
  }
});

// GET /usuarios -> obtener los datos del usuario autenticado
app.get("/usuarios", authMiddleware, async (req, res) => {
  try {
    const { email } = req.user;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const { password, ...userWithoutPassword } = user;
    return res.status(200).json([userWithoutPassword]);
  } catch (error) {
    console.error("Error en GET /usuarios:", error);
    return res.status(500).json({ error: "Error interno" });
  }
});

// ---------- LISTENERS ----------

app.listen(PORT, () => {
  console.log(`✅ Servidor levantado en ${BASE_URL}`);
});

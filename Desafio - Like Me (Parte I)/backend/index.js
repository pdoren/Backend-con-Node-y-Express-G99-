// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Por diferencias entre el puerto del frontend y backend, es necesario para evitar bloqueos de CORS
app.use(express.json());  // middleware para parsear el body de la petición


// ---------- Conexión DB ----------
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "likeme",
  port: 5433,
});

// ---------- Helpers ----------
const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const addPost = async (post) => {
  const { rows } = await pool.query(
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    [post.titulo, post.url, post.descripcion, 0]
  );
  return rows[0];
};

// ---------- Rutas ----------

// POST /posts : agrega un posts
// Body esperado (ejemplo): { "titulo": "...", "imgSrc": "...", "descripcion": "..." }
app.post("/posts", async (req, res) => {
  try {
    const { titulo, url: imgSrc, descripcion } = req.body;

    if (!titulo || !imgSrc || !descripcion) {
      return res.status(400).json({
        error: "Faltan campos obligatorios: titulo, img y descripcion",
      });
    }

    const nuevoPost = await addPost({ titulo, url: imgSrc, descripcion });
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar post" });
  }
});

// GET /posts : devuelve todos los posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener posts" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor levantado en http://localhost:${PORT}`);
});
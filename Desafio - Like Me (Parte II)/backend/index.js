// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Por diferencias entre el puerto del frontend y backend, es necesario para evitar bloqueos de CORS
app.use(express.json()); // middleware para parsear el body de la petición

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
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY likes DESC");
  return rows;
};

const addPost = async (post) => {
  const { rows } = await pool.query(
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    [post.titulo, post.url, post.descripcion, 0],
  );
  return rows[0];
};

// ---------- Rutas ----------

// POST /posts : agrega un posts
// Body esperado (ejemplo): { "titulo": "...", "imgSrc": "...", "descripcion": "..." }
app.post("/posts", async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    if (!titulo || !img || !descripcion) {
      return res.status(400).json({
        error: "Faltan campos obligatorios: titulo, img y descripcion",
      });
    }

    const nuevoPost = await addPost({ titulo, url: img, descripcion });
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

// PUT /posts/like/:id : agrega un like por id (params)
app.put("/posts/like/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "El id debe ser numérico" });
    }

    const posts = await getPosts();
    const index = posts.findIndex((p) => Number(p.id) === id);
    if (index === -1) {
      return res.status(404).json({ error: `No existe post con id ${id}` });
    }

    const likes = Number(posts[index].likes);
    await pool.query("UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *", [
      likes + 1,
      id,
    ]);

    res.json(posts[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar post" });
  }
});

// PUT /posts/:id : actualiza un post por id (params)
app.put("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "El id debe ser numérico" });
    }

    const { titulo, img, descripcion } = req.body;
    const posts = await getPosts();

    const index = posts.findIndex((p) => Number(p.id) === id);
    if (index === -1) {
      return res.status(404).json({ error: `No existe post con id ${id}` });
    }

    // Actualiza solo lo que tenga en el body
    posts[index] = {
      ...posts[index],
      ...(titulo !== undefined ? { titulo } : {}),
      ...(img !== undefined ? { url: img } : {}),
      ...(descripcion !== undefined ? { descripcion } : {}),
    };

    await pool.query(
      "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *",
      [
        posts[index].titulo,
        posts[index].url,
        posts[index].descripcion,
        posts[index].id,
      ],
    );

    res.json(posts[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar post" });
  }
});

// DELETE /posts/:id : elimina por id (params)
app.delete("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id) || Number(req.query.id);

    if (!Number.isFinite(id) || id <= 0) {
      return res
        .status(400)
        .json({ error: "Debes indicar un id válido (params o querystring)" });
    }

    const posts = await getPosts();
    const nuevas = posts.filter((p) => Number(p.id) !== id);

    if (nuevas.length === posts.length) {
      return res.status(404).json({ error: `No existe post con id ${id}` });
    }

    await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

    res.json({ ok: true, deletedId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar post" });
  }
});

// ---------- LISTENERS ----------

app.listen(PORT, () => {
  console.log(`✅ Servidor levantado en http://localhost:${PORT}`);
});

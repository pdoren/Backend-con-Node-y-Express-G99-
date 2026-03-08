// index.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());  // Por diferencias entre el puerto del frontend y backend, es necesario para evitar bloqueos de CORS
app.use(express.json());  // middleware para parsear el body de la petición

const DB_PATH = path.join(__dirname, "repertorio.json");

// ---------- Helpers ----------
function ensureDBFile() {
  if (!fs.existsSync(DB_PATH)) { // Se crea archivo si no existe
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");
  }
}

function readSongs() {
  ensureDBFile();
  const data = fs.readFileSync(DB_PATH, "utf8");
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Si el JSON está corrupto, lo reiniciamos para evitar caídas
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2), "utf8");
    return [];
  }
}

function writeSongs(songs) {
  fs.writeFileSync(DB_PATH, JSON.stringify(songs, null, 2), "utf8");
}

// ---------- Rutas ----------

// POST /canciones : agrega una canción
// Body esperado (ejemplo): { "titulo": "...", "artista": "...", "tono": "..." }
app.post("/canciones", (req, res) => {
  const { titulo, artista, tono } = req.body;

  if (!titulo || !artista) {
    return res.status(400).json({
      error: "Faltan campos obligatorios: titulo y artista",
    });
  }

  const canciones = readSongs();

  // id incremental simple
  const nextId =
    canciones.length === 0
      ? 1
      : Math.max(...canciones.map((c) => Number(c.id) || 0)) + 1;

  const nuevaCancion = {
    id: nextId,
    titulo,
    artista,
    tono: tono ?? "",
  };

  canciones.push(nuevaCancion);
  writeSongs(canciones);

  return res.status(201).json(nuevaCancion);
});

// GET /canciones : devuelve el repertorio completo
app.get("/canciones", (req, res) => {
  const canciones = readSongs();
  return res.json(canciones);
});

// PUT /canciones/:id : edita una canción por id (params)
app.put("/canciones/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "El id debe ser numérico" });
  }

  const { titulo, artista, tono } = req.body;
  const canciones = readSongs();

  const index = canciones.findIndex((c) => Number(c.id) === id);
  if (index === -1) {
    return res.status(404).json({ error: `No existe canción con id ${id}` });
  }

  // Actualiza solo lo que venga en el body
  canciones[index] = {
    ...canciones[index],
    ...(titulo !== undefined ? { titulo } : {}),
    ...(artista !== undefined ? { artista } : {}),
    ...(tono !== undefined ? { tono } : {}),
  };

  writeSongs(canciones);
  return res.json(canciones[index]);
});

// DELETE /canciones/:id : elimina por id (params)
app.delete("/canciones/:id", (req, res) => {
  const id = Number(req.params.id) || Number(req.query.id);

  if (!Number.isFinite(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Debes indicar un id válido (params o querystring)" });
  }

  const canciones = readSongs();
  const nuevas = canciones.filter((c) => Number(c.id) !== id);

  if (nuevas.length === canciones.length) {
    return res.status(404).json({ error: `No existe canción con id ${id}` });
  }

  writeSongs(nuevas);
  return res.json({ ok: true, deletedId: id });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor levantado en http://localhost:${PORT}`);
});
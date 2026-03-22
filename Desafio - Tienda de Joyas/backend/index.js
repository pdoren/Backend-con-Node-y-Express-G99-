// index.js
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const format = require("pg-format");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost:${PORT}`;

// --------- middleware ----------

app.use(cors()); // Por diferencias entre el puerto del frontend y backend, es necesario para evitar bloqueos de CORS
app.use(express.json()); // middleware para parsear el body de la petición

const reportMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const report = {
      fecha: new Date().toISOString(),
      metodo: req.method,
      ruta: req.originalUrl,
      status: res.statusCode,
      duracion_ms: Date.now() - start,
      query: req.query,
      params: req.params,
    };

    console.log("REPORTE:", report);

    fs.appendFile("reportes.log", JSON.stringify(report) + "\n", (err) => {
      if (err) console.error("Error al guardar reporte:", err);
    });
  });

  next();
};

const reportFilterEvent = (req, res, next) => {
  console.log("EVENTO FILTRO:", {
    fecha: new Date().toISOString(),
    filtros: req.query,
  });
  next();
};

const reportJoyaById = (req, res, next) => {
  console.log("EVENTO CONSULTA JOYA:", {
    fecha: new Date().toISOString(),
    id: req.params.id,
  });
  next();
};

app.use(reportMiddleware);


// ---------- Conexión DB ----------
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "joyas",
  port: 5433,
});

// ---------- Helpers ----------

const findAll = async ({ limit = 5, order = "id_ASC", page = 1 }) => {

  // Separación de campo y dirección de orden
  const [field, direction] = order.split("_");

  // Validación de campos y direcciones de orden
  const validFields = ["id", "nombre", "categoria", "metal", "precio", "stock"];
  const validDirections = ["ASC", "DESC"];

  if (!validFields.includes(field)) {
    throw new Error("Campo de orden no válido");
  }

  if (!validDirections.includes(direction)) {
    throw new Error("Dirección de orden no válida");
  }

  if (limit <= 0 || page <= 0) {
    throw new Error("limits y page deben ser mayores que 0");
  }

  // Calcula el número total de páginas
  const query = "SELECT id, nombre, stock FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L";
  const offset = (page - 1) * limit;
  const formattedQuery = format(query, field, direction, limit, offset);
  const { rows } = await pool.query(formattedQuery);

  // Devuelve un array con los resultados y un enlace a cada uno de ellos
  const results = rows.map((row) => {
    return {
      name: row.nombre,
      href: `/joyas/joya/${row.id}`,
    };
  });

  const stockTotal = rows.reduce((total, row) => total + row.stock, 0);

  // Devuelve un objeto con los resultados
  return {
    totalJoyas: results.length,
    stockTotal,
    results
  };
};

const filter = async ({
  precio_min = 0,
  precio_max = 10000,
  categoria = "aros",
  metal = "oro",
}) => {
  
  // Validación de categorías, metales y precios
  const validCategories = ["aros", "collar", "anillo"];
  const validMetals = ["oro", "plata"];

  if (!validCategories.includes(categoria)) {
    throw new Error("Categoria no válida");
  }

  if (!validMetals.includes(metal)) {
    throw new Error("Metal no válido");
  }

  if (precio_min < 0 || precio_max < 0) {
    throw new Error("Los precios deben ser positivos");
  }

  if (precio_min > precio_max) {
    throw new Error("El precio mínimo debe ser menor que el máximo");
  }

  // Consulta Query
  const query =
    "SELECT * FROM inventario WHERE precio >= %L AND precio <= %L AND categoria = %L AND metal = %L";
  
  const formattedQuery = format(
    query,
    precio_min,
    precio_max,
    categoria,
    metal,
  );
  const { rows } = await pool.query(formattedQuery);

  return rows;
};

const findById = async (id) => {
  const query = "SELECT * FROM inventario WHERE id = %L";
  const formattedQuery = format(
    query,
    id,
  );
  const { rows } = await pool.query(formattedQuery);

  return rows[0];
};

// ---------- Rutas ----------

// GET /joyas : devuelve todos los productos de la tabla 'inventario' con paginación
app.get("/joyas", async (req, res) => {
  try {
    const { limits, order_by, page } = req.query;

    if (!limits || !order_by || !page) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
      });
    }

    const limit = Number(limits);
    const currentPage = Number(page);

    if (isNaN(limit) || isNaN(currentPage)) {
      return res.status(400).json({
        error: "limits y page deben ser numéricos",
      });
    }

    const result = await findAll({
      limit,
      order: order_by,
      page: currentPage,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el inventario" });
  }
});

// GET /joyas/filtro : devuelve todos los productos de la tabla 'inventario' con paginación
app.get("/joyas/filtros", reportFilterEvent, async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    if (!precio_min || !precio_max || !categoria || !metal) {
      return res.status(400).json({
        error: "Faltan campos obligatorios",
      });
    }

    const precio_min_num = Number(precio_min);
    const precio_max_num = Number(precio_max);

    if (isNaN(precio_min_num) || isNaN(precio_max_num)) {
      return res.status(400).json({
        error: "precio_min y precio_max deben ser numéricos",
      });
    }

    const result = await filter({
      precio_min: precio_min_num,
      precio_max: precio_max_num,
      categoria,
      metal,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el inventario" });
  }
});

// GET /joyas/joya/:id : devuelve un producto de la tabla 'inventario' con paginación
app.get("/joyas/joya/:id", reportJoyaById, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ error: "El id debe ser numérico" });
    }

    const result = await findById(id);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el inventario" });
  }
});

// ---------- LISTENERS ----------

app.listen(PORT, () => {
  console.log(`✅ Servidor levantado en http://localhost:${PORT}`);
});

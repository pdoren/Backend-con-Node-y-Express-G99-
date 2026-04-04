const pool = require('./connection')

const format = require("pg-format");

const insertUser = async (email, password, rol, lenguage) => {
  const query = `
    INSERT INTO usuarios (email, password, rol, lenguage)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, rol, lenguage
  `;
  const values = [email, password, rol, lenguage];
  const result = await pool.query(query, values);
  return result;
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT id, email, password, rol, lenguage
    FROM usuarios
    WHERE email = $1
  `;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

const getAllUsers = async () => {
  const query = `
    SELECT id, email, password, rol, lenguage
    FROM usuarios
  `;
  const result = await pool.query(query);
  return result.rows;
};

const existsUserByEmail = async (email) => {
  const query = `
    SELECT 1
    FROM usuarios
    WHERE email = $1
  `;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rowCount > 0;
};

module.exports = {
  insertUser,
  getUserByEmail,
  getAllUsers,
  existsUserByEmail,
};

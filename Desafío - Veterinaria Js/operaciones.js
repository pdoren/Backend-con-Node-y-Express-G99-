const fs = require("fs");
const path = require("path");

// Ruta al archivo citas.json
const archivo = path.join(__dirname, "citas.json");

/**
 * Registrar una nueva cita veterinaria
 */
function registrar(nombre, edad, animal, color, enfermedad) {
  // Leer archivo actual
  let citas = [];

  if (fs.existsSync(archivo)) {
    const contenido = fs.readFileSync(archivo, "utf-8");
    citas = contenido ? JSON.parse(contenido) : [];
  }

  // Crear nueva cita
  const nuevaCita = {
    nombre,
    edad,
    animal,
    color,
    enfermedad,
  };

  // Agregar nueva cita al arreglo
  citas.push(nuevaCita);

  // Guardar nuevamente en el archivo
  fs.writeFileSync(archivo, JSON.stringify(citas, null, 2));

  console.log("Cita registrada correctamente");
}

/**
 * Leer todas las citas registradas
 */
function leer() {
  if (!fs.existsSync(archivo)) {
    console.log("No existen citas registradas.");
    return;
  }

  const contenido = fs.readFileSync(archivo, "utf-8");
  const citas = contenido ? JSON.parse(contenido) : [];

  if (citas.length === 0) {
    console.log("No hay citas registradas.");
    return;
  }

  console.log("Listado de Citas Veterinarias:");
  console.log("----------------------------------");
  citas.forEach((cita, index) => {
    console.log(`Cita #${index + 1}`);
    console.log(`Nombre: ${cita.nombre}`);
    console.log(`Edad: ${cita.edad}`);
    console.log(`Animal: ${cita.animal}`);
    console.log(`Color: ${cita.color}`);
    console.log(`Enfermedad: ${cita.enfermedad}`);
    console.log("----------------------------------");
  });
}

// Exportar funciones
module.exports = {
  registrar,
  leer,
};
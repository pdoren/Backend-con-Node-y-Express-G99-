const { registrar, leer } = require("./operaciones");

const [, , comando, ...args] = process.argv;

function mostrarAyuda() {
  console.log(`
Uso:
  node index.js registrar <nombre> <edad> <animal> <color> <enfermedad>
  node index.js leer

Ejemplos:
  node index.js registrar Benito "2 años" perro blanco vomitos
  node index.js leer
`);
}

if (!comando) {
  console.log("Debes indicar un comando (registrar o leer).");
  mostrarAyuda();
  process.exit(1);
}

if (comando === "registrar") {
  // Esperar 5 argumentos
  if (args.length < 5) {
    console.log("Faltan argumentos para registrar.");
    mostrarAyuda();
    process.exit(1);
  }

  const [nombre, edad, animal, color, ...enfermedadParts] = args;
  const enfermedad = enfermedadParts.join(" "); // por si viene con espacios

  registrar(nombre, edad, animal, color, enfermedad);
} else if (comando === "leer") {
  leer();
} else {
  console.log(`Comando no reconocido: ${comando}`);
  mostrarAyuda();
  process.exit(1);
}
const reportMiddleware = (req, res, next) => {
  const fecha = new Date().toLocaleString("es-CL");
  console.log(`[${fecha}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = reportMiddleware;
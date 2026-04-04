const registerCredentialsMiddleware = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;

  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ error: "Formato de email inválido" });
  }

  next();
};

const loginCredentialsMiddleware = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y password son obligatorios" });
  }

  next();
};

module.exports = {
  registerCredentialsMiddleware,
  loginCredentialsMiddleware,
};

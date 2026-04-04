const jwt = require("jsonwebtoken");

const getToken = (user) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ error: "Token no enviado" });
    }

    const token = authorization.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

module.exports = {
  getToken,
  authMiddleware,
};

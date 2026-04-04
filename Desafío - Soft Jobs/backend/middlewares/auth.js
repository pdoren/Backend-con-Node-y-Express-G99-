const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

const getToken = (user) => {
    const token = jwt.sign(
          {
            email: user.email
          },
          process.env.JWT_SECRET, {expiresIn: '1h'}
        );
    return token;
};

module.exports = { authMiddleware, getToken };
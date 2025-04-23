const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.split(" ")[1] ? authHeader.split(" ")[1] : null;

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.role = payload.role;
    next();
  });
};

const genrateToken = (role) => {
  return jwt.sign({ role }, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
};

module.exports = {
  genrateToken,
  verifyToken,
};

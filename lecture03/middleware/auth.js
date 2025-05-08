const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/users.model");

const verifyToken = (req, res, next) => {
  const token = req.cookies["authCookie"];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) return res.sendStatus(403);

    // get user perms from db
    const { permissions } = await getUserByUsername(payload.username);

    // add user perms to object
    req.user = { username: payload.username, permissions };
    next();
  });
};

module.exports = {
  verifyToken,
};

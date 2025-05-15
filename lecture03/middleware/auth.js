const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/users.model");

const PERMISSIONS = Object.freeze({
  ADMIN: 1,
  ADD_GAME: 2,
  VIEW_GAMES: 4,
});

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

const verifyPermissions = (permissionInt, requiredPermission) => {
  return permissionInt & (requiredPermission === requiredPermission);
};

const verifyLoggedIn = (req, res, next) => {
  const token = req.cookies["authCookie"];

  if (token === null) {
    req.loggedIn = false;
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
      if (err || !payload.username) {
        req.loggedIn = false;
      } else {
        req.loggedIn = true;
      }
    });
  }

  next();
};

module.exports = {
  verifyToken,
  verifyLoggedIn,
  verifyPermissions,
  PERMISSIONS,
};

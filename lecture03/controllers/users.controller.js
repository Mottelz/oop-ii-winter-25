const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/users.model");

const encryptPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 10);
};

const validateUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (user) {
    if (bcrypt.compare(password, user.password)) {
      const token = genrateToken(user.username);
      return { username: user.username, token };
    }
  }

  return null;
};

// should not exist!
// TODO: remove from auth middleware
const genrateToken = (username) => {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
};

module.exports = {
  encryptPassword,
  validateUser,
};

const db = require("better-sqlite3")("./games.db");
const fs = require("fs");

const initDB = () => {
  const initScript = fs.readFileSync("./scripts/init_db.sql", "utf8");
  const popScript = fs.readFileSync("./scripts/pop_db.sql", "utf8");
  db.exec(initScript);
  db.exec(popScript);
  return true;
};

module.exports = {
  db,
  initDB,
};

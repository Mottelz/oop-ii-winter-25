const { db } = require("./db_base");

const getAllGames = async () => {
  const stmnt = db.prepare("SELECT * FROM games;");
  return await stmnt.all();
};

const getGameById = async (id) => {
  const stmnt = db.prepare("SELECT * FROM games WHERE id = ?");
  return await stmnt.get(id);
};

const addGame = () => {};

module.exports = {
  getAllGames,
  getGameById,
  addGame,
};

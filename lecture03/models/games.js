const { db } = require("./db_base");

const getAllGames = async () => {
  const stmnt = db.prepare(`
    SELECT 
        games.id AS game_id,
        games.name AS game_name,
        games.year AS release_year,
        pub.name AS publisher,
        dev.name AS developer,
        GROUP_CONCAT(genres.name, ', ') AS genres
    FROM games
    LEFT JOIN companies AS pub ON games.publisher = pub.id
    LEFT JOIN companies AS dev ON games.developer = dev.id
    LEFT JOIN is_genre ON games.id = is_genre.game
    LEFT JOIN genres ON is_genre.genre = genres.id
    GROUP BY games.id;
`);
  return await stmnt.all();
};

const getGameById = async (id) => {
  const stmnt = db.prepare(`
    SELECT 
        games.id AS game_id,
        games.name AS game_name,
        games.year AS release_year,
        pub.name AS publisher,
        dev.name AS developer,
        GROUP_CONCAT(genres.name, ', ') AS genres
    FROM games
    LEFT JOIN companies AS pub ON games.publisher = pub.id
    LEFT JOIN companies AS dev ON games.developer = dev.id
    LEFT JOIN is_genre ON games.id = is_genre.game
    LEFT JOIN genres ON is_genre.genre = genres.id
    WHERE games.id = ?
    GROUP BY games.id;
`);

  return await stmnt.get(id);
};

const addGame = async ({ name, publisher, year, developer }) => {
  const stmnt = db.prepare(
    "INSERT INTO games (name, publisher, year, developer) VALUES (@name, @publisher, @year, @developer)",
  );
  return await stmnt.run({ name, publisher, developer, year });
};

module.exports = {
  getAllGames,
  getGameById,
  addGame,
};

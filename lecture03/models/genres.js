const { db } = require("./db_base");

const getAllGenres = async () => {
  const stmnt = db.prepare("SELECT * FROM genres");
  let genres;

  try {
    genres = await stmnt.all();
  } catch (err) {
    console.error(err);
    return null;
  }

  return genres ? genres : null;
};

const addGenreToGame = async ({gameId, genreId}) => {
  const stmnt = db.prepare('INSERT INTO is_genre (game, genre) VALUES (:gameId, :genreId)')

  try {
    await stmnt.run({gameId, genreId});
  } catch (e) {
    console.error(e);
    return false;
  }

  return true;
}

module.exports = {
  getAllGenres,
  addGenreToGame
};

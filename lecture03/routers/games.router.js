const router = require("express").Router();
const { getAllGames, getGameById, addGame } = require("../models/games.model");
const { getAllCompanies } = require("../models/companies.model");
const { getAllGenres, addGenreToGame } = require("../models/genres.model");
const {
  PERMISSIONS,
  verifyToken,
  verifyPermissions,
} = require("../middleware/auth");

router.get("/games", verifyToken, async (req, res) => {
  const games = await getAllGames();
  if (
    verifyPermissions(req.user.permissions, PERMISSIONS.VIEW_GAMES) &&
    games
  ) {
    res.render("games", { title: `${games.length} Games`, games });
  } else {
    res.redirect("/");
  }
});

router.get("/games/add", async (req, res) => {
  const companies = await getAllCompanies();
  const genres = await getAllGenres();
  if (companies) {
    res.render("add-game", { title: "New Game", companies, genres });
  } else {
    res.redirect("/games");
  }
});

router.get("/games/:id", async (req, res) => {
  const gid = req.params.id;
  const game = await getGameById(gid);
  if (game) {
    res.render("game", { title: game.game_name, game });
  } else {
    res.redirect("/games");
  }
});

router.post("/games", async (req, res) => {
  const name = req.body.name;
  const publisher = req.body.publisher;
  const year = req.body.year;
  const developer = req.body.developer;
  const genres = req.body.genres;

  const result = await addGame({ name, publisher, year, developer });
  const gameId = result.lastInsertRowid;

  await genres.map(async (genreId) => {
    await addGenreToGame({ gameId, genreId });
  });

  res.redirect(`/games/${gameId}`);
});

module.exports = router;

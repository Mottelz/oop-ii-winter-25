const router = require("express").Router();
const { getAllGames, getGameById, addGame } = require("../models/games");
const { getAllCompanies } = require("../models/companies");

router.get("/games", async (req, res) => {
  const games = await getAllGames();
  if (games) {
    res.render("games", { title: `${games.length} Games`, games });
  } else {
    res.redirect("/");
  }
});

router.get("/games/add", async (req, res) => {
  const companies = await getAllCompanies();
  if (companies) {
    res.render("add-game", { title: "New Game", companies });
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

router.post("/games", (req, res) => {
  const name = req.body.name;
  const publisher = req.body.publisher;
  const year = req.body.year;
  const developer = req.body.developer;

  const result = addGame({ name, publisher, year, developer });
  res.json({
    game: result,
    msg: `${name} added to library.`,
  });
});

module.exports = router;

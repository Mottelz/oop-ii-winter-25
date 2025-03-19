const router = require("express").Router();
const { getAllGames, getGameById, addGame } = require("../models/games");

router.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.render("games", { title: `${games.length} Games`, games });
  // res.json({ games });
});

router.get("/games/:id", async (req, res) => {
  const gid = req.params.id;
  const game = await getGameById(gid);
  res.render("game", { title: game.game_name, game });
  // res.json(game);
});

router.post("/games", (req, res) => {
  const name = req.body.name;
  const publisher = req.body.publisher;
  const year = req.body?.year;
  const developer = req.body?.developer;

  const result = addGame({ name, publisher, year, developer });
  res.json({
    game: result,
    msg: `${name} added to library.`,
  });
});

module.exports = router;

const router = require("express").Router();
const { getAllGames, getGameById } = require("../models/games");

router.get("/games", async (req, res) => {
  const games = await getAllGames();
  res.json({ games });
});

router.get("/games/:id", async (req, res) => {
  const gid = req.params.id;
  const game = await getGameById(gid);
  res.json(game);
});

router.post("/games", (req, res) => {
  const name = req.body.name;
  const publisher = req.body.publisher;

  res.json({ game: name, publisher, msg: `${name} added to library.` });
});

module.exports = router;

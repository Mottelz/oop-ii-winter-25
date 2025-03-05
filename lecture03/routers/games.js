const router = require("express").Router();

router.get("/games", (req, res) => {
  res.json({ msg: "This library does not have any games yet." });
});

router.get("/games/:id", (req, res) => {
  const gid = req.params.id;
  res.json({ gid, msg: `${gid} is not a valid id.` });
});

router.post("/games", (req, res) => {
  const name = req.body.name;
  const publisher = req.body.publisher;

  res.json({ game: name, publisher, msg: `${name} added to library.` });
});

module.exports = router;

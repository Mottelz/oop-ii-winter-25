const router = require("express").Router();
const { initDB } = require("../models/db_base");
const { verifyToken } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/init", verifyToken, (req, res) => {
  if (req.user.permissions === 1) {
    initDB();
    res.json({ msg: "DB initialized" });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

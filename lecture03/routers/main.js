const router = require("express").Router();
const { initDB } = require("../models/db_base");
const { genrateToken, verifyToken } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/auth", (req, res) => {
  const token = genrateToken("admin");
  res.json({ token });
});

router.get("/init", verifyToken, (req, res) => {
  if (req.role === "admin") {
    initDB();
    res.json({ msg: "DB initialized" });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

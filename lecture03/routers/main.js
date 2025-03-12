const router = require("express").Router();
const { initDB } = require("../models/db_base");

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/init", (req, res) => {
  initDB();
  res.json({ msg: "DB initialized" });
});

module.exports = router;

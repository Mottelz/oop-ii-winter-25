const router = require("express").Router();
const { initDB } = require("../models/db_base");
const { authChecker } = require('../middleware/auth')

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/init", authChecker, (req, res) => {
  initDB();
  res.json({ msg: "DB initialized" });
});

module.exports = router;

// Base imports
const express = require("express");
const bodyParser = require("body-parser");

// Router Imports
const gamesRouter = require("./routers/games.js");
const mainRouter = require("./routers/main.js");
const port = process.env.PORT || 3000;

// Create & Configure App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("./public"));

// Load routers
app.use("", mainRouter);
app.use("", gamesRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.all("*", (req, res) => {
  res.status(404).render("404", { title: "404 Not Found" });
});

// Error Handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Error :(");
});

// Run app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

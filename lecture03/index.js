// Base imports
const express = require("express");
const bodyParser = require("body-parser");
const { routeLogger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler.js");

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
app.use(routeLogger);

// Load routers
app.use("", mainRouter);
app.use("", gamesRouter);

// 404 Error
app.all("*", (req, res) => {
  res.status(404).render("error", { title: "404 Not Found", msg: "This page was not found." });
});

app.use(errorHandler);

// Run app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

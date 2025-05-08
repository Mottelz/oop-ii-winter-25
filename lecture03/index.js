// Base imports
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { routeLogger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler.js");

// Router Imports
const gamesRouter = require("./routers/games.router.js");
const mainRouter = require("./routers/main.router.js");
const userRouter = require("./routers/users.router.js");
const port = process.env.PORT || 3000;

// Create & Configure App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(routeLogger);

// Load routers
app.use("", mainRouter);
app.use("", gamesRouter);
app.use("", userRouter);

// 404 Error
app.all("*", (req, res) => {
  res.status(404).render("error", {
    title: "404 Not Found",
    msg: "This page was not found.",
  });
});

app.use(errorHandler);

// Run app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

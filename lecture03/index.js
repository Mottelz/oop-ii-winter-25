const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("It works!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

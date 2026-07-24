const express = require("express");

const app = express();

console.log("PORT from env:", process.env.PORT);

const PORT = Number(process.env.PORT) || 8080;

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on ${PORT}`);
});
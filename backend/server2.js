const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request:", req.url);
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello Railway");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening on", PORT);
});
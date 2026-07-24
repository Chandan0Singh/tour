const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log("Request:", req.url);

  res.writeHead(200, {
    "Content-Type": "text/plain",
  });

  res.end("Railway Working");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Listening", PORT);
});
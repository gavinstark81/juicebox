const express = require("express");
const morgan = require("morgan");
const PORT = 3000;
const server = express();

// --- Importing our PG Client --------
const { client } = require("./db");
client.connect();

// --- MIDDLE WARE --------
server.use(morgan("dev"));
server.use(express.json());

// --- ROUTES --------
const apiRouter = require("./api");
// all routes will now have /api/ on their URL
server.use("/api", apiRouter);

// ---- Server Listens -----
server.listen(PORT, () => {
  console.log("the server is up on port", PORT);
});

const express = require("express");
const { getAllUsers } = require("../db");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
  console.log("a request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();

  res.send({
    users,
  });
});

module.exports = usersRouter;

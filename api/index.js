const express = require("express");
const apiRouter = express.Router();

const { getUserById } = require("../db");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use((req, res, next) => {
  if (req.user) {
    // console.log("user is set:", req.user);
  }

  next();
});

const usersRouter = require("./users");
// This will be at /api/users
apiRouter.use("/users", usersRouter);

const postsRouter = require("./posts");
// This will be at /api/posts
apiRouter.use("/posts", postsRouter);

const tagsRouter = require("./tags");
//this will be at /api/tags
apiRouter.use("/tags", tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
